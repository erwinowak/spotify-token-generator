import { NextRequest, NextResponse } from "next/server";
import { generateSpotifyAuthUrl, generateState } from "@/lib/spotify";
import { formSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = formSchema.parse(body);

    const state = generateState();
    const redirectUri = validatedData.redirectUri;

    const authUrl = generateSpotifyAuthUrl(validatedData, state, redirectUri);

    return NextResponse.json({
      authUrl,
      state,
    });
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return NextResponse.json(
      { error: "Failed to generate auth URL", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
