import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import sharp from "sharp";
import { site } from "@/content/site";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export const ogSize = { width: 1200, height: 630 };

function LogoMark({ size }: { size: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 512 512" style={{ display: "flex" }}>
      <g fill="none" stroke="#142233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="35">
        <circle cx="254.5" cy="260.5" r="191" strokeWidth="34" />
        <path d="M130 337 L182 190 Q189 172 196 190 L254 337 M146 298 H238" />
        <path d="M279.5 176 V337 M370 176 L302 268 M322 266 L381 337" />
      </g>
    </svg>
  );
}

/** The site-wide card: logo, name and headline. */
export function siteOgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 64,
        background: "#e9edf2",
        color: "#142233",
        padding: "80px",
      }}
    >
      <LogoMark size={260} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
        <div style={{ fontSize: 42, color: "#1f3a5f", marginTop: 8 }}>{site.headline}</div>
        <div style={{ fontSize: 28, color: "#4f5d6e", marginTop: 28 }}>
          React, TypeScript, Kotlin, Spring Boot, Elixir
        </div>
      </div>
    </div>,
    ogSize,
  );
}

/** A page card: title and lead, with an optional screenshot from `public/`. */
export async function pageOgImage({
  title,
  lead,
  detail,
  screenshot,
}: {
  title: string;
  lead: string;
  detail?: string;
  screenshot?: string;
}) {
  // Satori cannot decode WebP, so the screenshot is converted to JPEG first.
  const image = screenshot
    ? `data:image/jpeg;base64,${(
        await sharp(await readFile(join(process.cwd(), "public", screenshot)))
          .resize(580 * 2)
          .jpeg({ quality: 80 })
          .toBuffer()
      ).toString("base64")}`
    : null;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#e9edf2",
        color: "#142233",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: image ? 620 : "100%",
          padding: "64px 56px 56px 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: image ? 64 : 84, fontWeight: 700, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#4b596a", marginTop: 20, lineHeight: 1.35 }}>
            {lead}
          </div>
          {detail ? (
            <div style={{ fontSize: 24, color: "#1f3a5f", marginTop: 24 }}>{detail}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LogoMark size={56} />
          <div style={{ fontSize: 28, fontWeight: 600 }}>{site.name}</div>
        </div>
      </div>
      {image ? (
        // biome-ignore lint/performance/noImgElement: Satori renders plain img elements only
        <img
          src={image}
          alt=""
          width={580}
          height={630}
          style={{ objectFit: "cover", objectPosition: "left top" }}
        />
      ) : null}
    </div>,
    ogSize,
  );
}

/** Card for a top-level page, from its translated title and description. */
export async function sectionOgImage(
  params: Promise<{ locale: string }>,
  namespace: "projects" | "experience" | "skills" | "education" | "about" | "contact" | "cv",
) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace });
  return pageOgImage({
    title: t("title"),
    lead: t.has("description") ? t("description") : pick(site.availability, locale),
  });
}
