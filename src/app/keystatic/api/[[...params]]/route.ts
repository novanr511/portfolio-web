import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "../../../../../keystatic.config";

const hasGitHubConfig = Boolean(
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
    process.env.KEYSTATIC_SECRET
);
const handler =
  process.env.NODE_ENV !== "production" || hasGitHubConfig
    ? makeRouteHandler({ config: keystaticConfig })
    : null;

function unavailable() {
  return Response.json(
    { error: "Keystatic GitHub OAuth is not configured for this deployment." },
    { status: 503 }
  );
}

export async function GET(request: Request) {
  return handler ? handler.GET(request) : unavailable();
}

export async function POST(request: Request) {
  return handler ? handler.POST(request) : unavailable();
}
