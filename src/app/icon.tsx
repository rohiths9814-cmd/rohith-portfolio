import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Shapes-only — no text rendering, so @vercel/og won't try to load fonts.
// This avoids the Windows path resolution bug (ERR_INVALID_URL).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#050810",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          border: "1.5px solid rgba(0,255,136,0.45)",
        }}
      >
        {/* Shield shape — outer */}
        <div
          style={{
            width: 16,
            height: 19,
            background: "rgba(0,255,136,0.12)",
            border: "1.5px solid rgba(0,255,136,0.8)",
            borderRadius: "4px 4px 9px 9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Shield inner dot */}
          <div
            style={{
              width: 6,
              height: 6,
              background: "#00ff88",
              borderRadius: "50%",
              boxShadow: "0 0 6px rgba(0,255,136,0.9)",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
