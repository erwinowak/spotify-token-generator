import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

type RouteContext = {
  params: Promise<{ width: string; height: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  // Pobierz wymiary z URL lub użyj domyślnych
  const params = await context.params;
  const width = parseInt(params.width) || 800;
  const height = parseInt(params.height) || 400;

  // Walidacja wymiarów (min 100, max 2000)
  const validWidth = Math.max(100, Math.min(2000, width));
  const validHeight = Math.max(100, Math.min(2000, height));

  // Oblicz skalę bazując na mniejszym wymiarze, aby wszystko się zmieściło
  const minDimension = Math.min(validWidth, validHeight);
  const scale = minDimension / 400; // Bazujemy na wysokości 400px

  // Oblicz proporcjonalne rozmiary elementów na podstawie skali
  const iconSize = Math.min(100 * scale, validWidth * 0.15, validHeight * 0.2);
  const iconInnerSize = iconSize * 0.6;
  
  // Fonty bazują na szerokości, ale są ograniczone wysokością
  const maxTitleFontSize = Math.min(validWidth * 0.06, validHeight * 0.12);
  const titleFontSize = Math.max(20, maxTitleFontSize);
  
  const maxSubtitleFontSize = Math.min(validWidth * 0.025, validHeight * 0.05);
  const subtitleFontSize = Math.max(12, maxSubtitleFontSize);
  
  // Gap i padding są ograniczone dostępną przestrzenią
  const maxGap = validHeight * 0.08;
  const gap = Math.min(30 * scale, maxGap);
  const maxPadding = Math.min(validWidth * 0.05, validHeight * 0.1);
  const padding = Math.min(40 * scale, maxPadding);
  
  // Oblicz maksymalną wysokość dla tekstu, aby się zmieścił
  const availableHeight = validHeight - (padding * 2) - iconSize - gap * 2;
  const textMaxHeight = availableHeight * 0.6; // 60% dostępnej przestrzeni dla tekstu

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: `${gap}px`,
            padding: `${padding}px`,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              borderRadius: `${iconSize * 0.16}px`,
              background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={iconInnerSize}
              height={iconInnerSize}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="9" y="6" width="6" height="12" rx="1" fill="white" />
              <circle cx="12" cy="10" r="1.5" fill="#1DB954" />
            </svg>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: `${Math.min(titleFontSize, textMaxHeight * 0.4)}px`,
              fontWeight: "bold",
              color: "white",
              margin: 0,
              textAlign: "center",
              lineHeight: "1.1",
              maxHeight: `${textMaxHeight * 0.6}px`,
              overflow: "hidden",
            }}
          >
            Spotify Refresh Token Generator
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: `${Math.min(subtitleFontSize, textMaxHeight * 0.25)}px`,
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              textAlign: "center",
              maxWidth: `${validWidth * 0.875}px`,
              maxHeight: `${textMaxHeight * 0.4}px`,
              overflow: "hidden",
            }}
          >
            Generate your refresh token in a few simple steps
          </p>
        </div>
      </div>
    ),
    {
      width: validWidth,
      height: validHeight,
    }
  );
}
