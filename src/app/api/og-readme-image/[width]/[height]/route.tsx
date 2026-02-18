import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

type RouteContext = {
  params: Promise<{ width: string; height: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const params = await context.params;
  const w = Math.max(100, Math.min(2000, parseInt(params.width) || 800));
  const h = Math.max(100, Math.min(2000, parseInt(params.height) || 400));
  const s = Math.min(w, h) / 400;

  const iconSize = Math.min(100 * s, w * 0.2, h * 0.22);
  const iconInner = iconSize * 0.56;
  const titleSize = Math.max(18, Math.min(48 * s, w * 0.045, h * 0.1));
  const subSize = Math.max(11, Math.min(20 * s, h * 0.04));
  const pad = Math.min(80 * s, w * 0.08, h * 0.12);
  const gap = Math.min(40 * s, h * 0.08);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#111",
          padding: `${pad}px`,
        }}
      >
        <div
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "14px",
            background: "#1DB954",
          }}
        >
          <svg
            width={iconInner}
            height={iconInner}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="9" y="6" width="6" height="12" rx="1" fill="white" />
            <circle cx="12" cy="10" r="1.5" fill="#1DB954" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: `${gap}px`,
            maxWidth: "90%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "nowrap",
              fontSize: `${titleSize}px`,
              fontWeight: "bold",
              color: "white",
              lineHeight: "1.2",
              textAlign: "center",
            }}
          >
            Token Generator{"\u00A0"}
            <span style={{ color: "#1DB954" }}>for Spotify</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: `${12 * s}px`,
              fontSize: `${subSize}px`,
              color: "#888",
              textAlign: "center",
            }}
          >
            Refresh token in a few steps
          </div>
        </div>
      </div>
    ),
    { width: w, height: h }
  );
}
