const ALLOWED_GITHUB_LOGIN = "novanr511";

/** Verify a Keystatic OAuth token belongs to the portfolio owner. */
export async function isAllowedKeystaticUser(accessToken: string | undefined) {
  if (!accessToken) return false;

  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    });

    if (!response.ok) return false;

    const user: { login?: unknown } = await response.json();
    return (
      typeof user.login === "string" &&
      user.login.toLowerCase() === ALLOWED_GITHUB_LOGIN
    );
  } catch {
    return false;
  }
}
