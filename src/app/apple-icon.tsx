import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
          borderRadius: "20%",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simple Key Symbol */}
          <rect x="9" y="6" width="6" height="12" rx="1" fill="white" />
          <circle cx="12" cy="10" r="1.5" fill="#1DB954" />
        </svg>
      </div>
    ),
    {
      width: 180,
      height: 180,
    }
  );
}
