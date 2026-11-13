import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "../../../../keystatic.config";

/** Keystatic uses usePathname in its client UI, so skip instant validation. */
export const instant = false;

const KeystaticPage = makePage(keystaticConfig);
const hasGitHubConfig = Boolean(
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
    process.env.KEYSTATIC_SECRET
);

export default function Page() {
  if (process.env.NODE_ENV === "production" && !hasGitHubConfig) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-foreground">
        <h1 className="text-3xl font-semibold">CMS setup required</h1>
        <p className="mt-4 leading-relaxed text-muted">
          The article editor is not connected to GitHub yet. Add
          KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, and
          KEYSTATIC_SECRET to the Vercel project environment, then redeploy.
        </p>
      </main>
    );
  }

  return <KeystaticPage />;
}
