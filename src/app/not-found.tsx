import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-6 pb-24 pt-28">
      <p className="text-[13px] font-semibold uppercase tracking-widest text-accent">
        404
      </p>
      <h1 className="mt-3 text-[36px] font-semibold tracking-[-0.02em] text-foreground sm:text-[44px]">
        This page went missing.
      </h1>
      <p className="mt-4 text-[16px] text-muted">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-contrast transition-colors hover:bg-accent-strong"
      >
        Back to home
      </Link>
    </div>
  );
}
