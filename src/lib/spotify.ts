import type { FormData } from "./validations";

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

export function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function generateSpotifyAuthUrl(
  formData: FormData,
  state: string,
  redirectUri: string
): string {
  const params = new URLSearchParams({
    client_id: formData.clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: formData.scopes.join(" "),
    state: state,
    show_dialog: "false",
  });

  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(
  code: string,
  formData: FormData,
  redirectUri: string
): Promise<{ access_token: string; refresh_token: string; expires_in: number }> {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${formData.clientId}:${formData.clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error_description || error.error || "Failed to exchange code for token");
  }

  return await response.json();
}
