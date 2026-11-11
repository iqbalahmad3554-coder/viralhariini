import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/news-data";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticleOgImage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article
    ? article.title.length > 110
      ? `${article.title.slice(0, 107).trimEnd()}...`
      : article.title
    : SITE_NAME;
  const excerpt = article
    ? article.excerpt.length > 150
      ? `${article.excerpt.slice(0, 147).trimEnd()}...`
      : article.excerpt
    : "";
  const readTime = article?.readTime ?? 0;

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
            "linear-gradient(140deg, #0f172a 0%, #172554 60%, #450a0a 100%)",
          padding: 64,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Baris atas: brand + kategori */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #dc2626, #f97316)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              V
            </div>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
              Viral<span style={{ color: "#f87171" }}>HariIni</span>
              <span style={{ color: "#94a3b8" }}>.id</span>
            </div>
          </div>
          {article && (
            <div
              style={{
                display: "flex",
                padding: "8px 22px",
                borderRadius: 999,
                background: "#dc2626",
                color: "white",
                fontSize: 24,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {article.category}
            </div>
          )}
        </div>

        {/* Judul + ringkasan */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: title.length > 70 ? 54 : 64,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: -1.5,
              display: "flex",
            }}
          >
            {title}
          </div>
          {excerpt && (
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.45,
                color: "#cbd5e1",
                display: "flex",
              }}
            >
              {excerpt}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#94a3b8",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ color: "#f87171", fontWeight: 700 }}>
              {article?.author ?? SITE_NAME}
            </span>
            {readTime > 0 && <span>·</span>}
            {readTime > 0 && <span>{readTime} menit baca</span>}
          </div>
          <div
            style={{
              display: "flex",
              padding: "6px 18px",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.25)",
              fontWeight: 600,
            }}
          >
            GRATIS tanpa paywall
          </div>
        </div>
      </div>
    ),
    size,
  );
}
