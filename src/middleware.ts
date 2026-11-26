import { NextResponse, type NextRequest } from "next/server";

/**
 * The apex domain is canonical. `www` has a valid certificate but serving the
 * same pages on both hosts splits signals, so redirect it permanently.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === "www.novandri.com") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = "novandri.com";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
