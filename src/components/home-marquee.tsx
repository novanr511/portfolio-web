"use client";

import { useState } from "react";

/**
 * Decorative name marquee with a real pause control.
 * Reason: the loop runs longer than five seconds, so the user must be able to
 * stop it (R-39). It is hidden from assistive tech because the h1 carries the
 * identity in text.
 */
export function HomeMarquee({ name }: { name: string }) {
  const [paused, setPaused] = useState(false);

  function row(outline: boolean, reverse: boolean) {
    return (
      <div
        className={`home-marquee-track${reverse ? " reverse" : ""}`}
        aria-hidden="true"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className={`home-marquee-row${outline && i % 2 === 1 ? " outline" : ""}`}
          >
            {name}&nbsp;·&nbsp;
          </span>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="home-marquee" data-paused={paused}>
        {row(false, false)}
        {row(true, true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-label={paused ? "Play name animation" : "Pause name animation"}
        className="home-marquee-toggle focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {paused ? "Play motion" : "Pause motion"}
      </button>
    </>
  );
}
