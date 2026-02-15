import { NextRequest, NextResponse } from "next/server";

function getBaseUrl(request: NextRequest): string {
  // Użyj NEXT_PUBLIC_SITE_URL jeśli jest dostępna
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    return siteUrl;
  }

  // W przeciwnym razie użyj nagłówków HTTP (dla reverse proxy)
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || (request.url.startsWith("https") ? "https" : "http");
  
  if (host) {
    return `${protocol}://${host}`;
  }

  // Fallback do URL z request
  return new URL("/", request.url).origin;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const baseUrl = new URL("/", getBaseUrl(request));

  if (error) {
    baseUrl.searchParams.set("error", error);
    return NextResponse.redirect(baseUrl);
  }

  if (!code) {
    baseUrl.searchParams.set("error", "missing_code");
    return NextResponse.redirect(baseUrl);
  }

  // Przekieruj do strony głównej z kodem i state
  baseUrl.searchParams.set("code", code);
  if (state) {
    baseUrl.searchParams.set("state", state);
  }

  return NextResponse.redirect(baseUrl);
}
