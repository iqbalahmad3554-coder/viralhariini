import { ImageResponse } from "next/og";

export const alt = "ViralHariIni.id — Berita Viral & Terkini Hari Ini";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #3b0764 100%)",
          padding: 64,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #dc2626, #f97316)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            V
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            Viral
            <span style={{ color: "#f87171" }}>HariIni</span>
            <span style={{ color: "#94a3b8" }}>.id</span>
          </div>
        </div>

        {/* Judul */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Berita paling ramai</span>
            <span>dibicarakan hari ini</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: 999,
                background: "#dc2626",
                color: "white",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              100% GRATIS
            </div>
            <div
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.25)",
                color: "#e2e8f0",
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              Tanpa paywall
            </div>
            <div
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.25)",
                color: "#e2e8f0",
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              Politik · Ekonomi · Viral
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#94a3b8",
            fontSize: 26,
          }}
        >
          <span>viralhariini.vercel.app</span>
          <span>Berita baru tiap hari</span>
        </div>
      </div>
    ),
    size,
  );
}
