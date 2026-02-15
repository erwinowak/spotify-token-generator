import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/spotify";
import { formSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, formData, redirectUri } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is required" },
        { status: 400 }
      );
    }

    const validatedData = formSchema.parse(formData);

    const tokens = await exchangeCodeForToken(
      code,
      validatedData,
      redirectUri || validatedData.redirectUri
    );

    return NextResponse.json({
      refreshToken: tokens.refresh_token,
      accessToken: tokens.access_token,
      expiresIn: tokens.expires_in,
    });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return NextResponse.json(
      {
        error: "Failed to exchange code for token",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
