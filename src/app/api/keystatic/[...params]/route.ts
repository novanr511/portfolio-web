import { makeRouteHandler } from "@keystatic/next/route-handler";
import { isAllowedKeystaticUser } from "@/lib/keystatic-auth";
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

function requestCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0 || part.slice(0, separator).trim() !== name) continue;

    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return undefined;
    }
  }
  return undefined;
}

function responseCookie(response: Response, name: string) {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };
  const setCookies =
    headers.getSetCookie?.() ?? [headers.get("set-cookie") ?? ""];
  const prefix = `${name}=`;
  const cookie = setCookies.find((value) => value.startsWith(prefix));
  if (!cookie) return undefined;

  try {
    return decodeURIComponent(cookie.slice(prefix.length).split(";", 1)[0]);
  } catch {
    return undefined;
  }
}

function forbidden() {
  const response = new Response(
    "This Keystatic CMS is restricted to the portfolio owner's GitHub account.",
    {
      status: 403,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.headers.append(
    "Set-Cookie",
    `keystatic-gh-access-token=; Path=/; Max-Age=0; SameSite=Lax${secure}; HttpOnly`
  );
  response.headers.append(
    "Set-Cookie",
    `keystatic-gh-refresh-token=; Path=/; Max-Age=0; SameSite=Lax${secure}; HttpOnly`
  );
  return response;
}

async function handle(request: Request, method: "GET" | "POST") {
  if (!handler) return unavailable();
  if (process.env.NODE_ENV !== "production") return handler[method](request);

  const path = new URL(request.url).pathname.replace(/^\/api\/keystatic\/?/, "");

  // Let anyone start OAuth; the callback only keeps credentials for the owner.
  if (method === "GET" && path === "github/login") {
    return handler.GET(request);
  }

  if (method === "GET" && path === "github/oauth/callback") {
    const response = await handler.GET(request);
    const accessToken = responseCookie(response, "keystatic-gh-access-token");
    if (!accessToken) return response;
    return (await isAllowedKeystaticUser(accessToken)) ? response : forbidden();
  }

  // Refresh first, then validate the newly issued token (or retain the 401).
  if (method === "GET" && path === "github/refresh-token") {
    const response = await handler.GET(request);
    const refreshedToken = responseCookie(
      response,
      "keystatic-gh-access-token"
    );
    if (!refreshedToken) return response;
    return (await isAllowedKeystaticUser(refreshedToken))
      ? response
      : forbidden();
  }

  // Logging out is always permitted, including for a rejected session.
  if (method === "GET" && path === "github/logout") {
    return handler.GET(request);
  }

  const accessToken = requestCookie(request, "keystatic-gh-access-token");
  if (!(await isAllowedKeystaticUser(accessToken))) return forbidden();

  return handler[method](request);
}

export async function GET(request: Request) {
  return handle(request, "GET");
}

export async function POST(request: Request) {
  return handle(request, "POST");
}
