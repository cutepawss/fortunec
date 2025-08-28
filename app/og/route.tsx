import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fortune Cast";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("t") || "Your daily fortune is ready.";
  const tag = searchParams.get("g") || "fortune";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "800px",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px",
          fontSize: 56,
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          color: "white"
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "960px" }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>🎴 Fortune Cast</div>
          <div style={{ lineHeight: 1.2 }}>{text}</div>
          <div style={{ marginTop: 32, fontSize: 32, opacity: 0.8 }}>#{tag}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 800 }
  );
}
