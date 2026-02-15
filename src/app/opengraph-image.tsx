import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            gap: "40px",
            padding: "60px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="80"
              height="80"
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
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              margin: 0,
              textAlign: "center",
              lineHeight: "1.1",
            }}
          >
            Spotify Refresh Token Generator
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              textAlign: "center",
              maxWidth: "900px",
            }}
          >
            Generate your refresh token in a few simple steps
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
