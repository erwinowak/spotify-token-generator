import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          padding: "80px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "14px",
            background: "#1DB954",
          }}
        >
          <svg
            width="56"
            height="56"
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
            marginTop: "40px",
            maxWidth: "900px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "nowrap",
              fontSize: "48px",
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
              marginTop: "12px",
              fontSize: "20px",
              color: "#888",
              textAlign: "center",
            }}
          >
            Refresh token in a few steps
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
