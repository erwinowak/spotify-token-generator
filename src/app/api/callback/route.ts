import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const baseUrl = new URL("/", request.url);

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
