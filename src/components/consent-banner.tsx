"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const CONSENT_KEY = "novan-consent";
const CONSENT_CHANGE_EVENT = "portfolio-consent-change";

type ConsentChoice = "accepted" | "rejected";

/** `gtag` is installed globally by the GTM init script in the root layout. */
type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

/** Hidden on the server; the real stored value is read after hydration. */
function getServerSnapshot() {
  return "pending";
}

function grantAnalytics() {
  const gtagWindow = window as GtagWindow;
  if (typeof gtagWindow.gtag === "function") {
    gtagWindow.gtag("consent", "update", { analytics_storage: "granted" });
  }
}

/**
 * Small, non-blocking consent notice for the single analytics tag on this
 * site. Both choices are equally visible; nothing is pre-ticked. The stored
 * choice is read with useSyncExternalStore so SSR and hydration agree.
 */
export function ConsentBanner() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const [shown, setShown] = useState(false);
  const granted = useRef(false);

  // Consent Mode defaults deny storage on every page load, so a returning
  // visitor who previously accepted needs the granted state re-applied.
  useEffect(() => {
    if (stored === "accepted" && !granted.current) {
      granted.current = true;
      grantAnalytics();
    }
  }, [stored]);

  // Fade in only after mount, and never animate when motion is reduced.
  useEffect(() => {
    if (stored !== null) return;
    const frame = window.requestAnimationFrame(() => setShown(true));
    return () => window.cancelAnimationFrame(frame);
  }, [stored]);

  function choose(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* storage disabled (private mode) */
    }
    if (choice === "accepted") {
      granted.current = true;
      grantAnalytics();
    }
    setDismissed(true);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }

  if (stored !== null || dismissed) return null;

  return (
    <aside
      aria-label="Cookie consent"
      aria-describedby="consent-description"
      className={`fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-border bg-surface p-5 shadow-xl transition-opacity duration-300 motion-reduce:transition-none sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <p
        id="consent-description"
        className="text-[13px] leading-relaxed text-muted"
      >
        This site uses Google Tag Manager and Google Analytics to understand
        traffic, but only after you opt in. No analytics storage is set before
        you choose.{" "}
        <Link href="/privacy" className="font-medium text-accent hover:underline">
          Read the privacy note
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-accent-contrast transition-colors hover:bg-accent-strong motion-reduce:transition-none"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-border px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent motion-reduce:transition-none"
        >
          Reject
        </button>
      </div>
    </aside>
  );
}
