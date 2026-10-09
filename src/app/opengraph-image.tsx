import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
      <svg width="260" height="260" viewBox="0 0 512 512" style={{ display: "flex" }}>
        <title>AK</title>
        <g
          fill="none"
          stroke="#142233"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="35"
        >
          <circle cx="254.5" cy="260.5" r="191" strokeWidth="34" />
          <path d="M130 337 L182 190 Q189 172 196 190 L254 337 M146 298 H238" />
          <path d="M279.5 176 V337 M370 176 L302 268 M322 266 L381 337" />
        </g>
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
        <div style={{ fontSize: 42, color: "#1f3a5f", marginTop: 8 }}>{site.headline}</div>
        <div style={{ fontSize: 28, color: "#4f5d6e", marginTop: 28 }}>
          React, TypeScript, Kotlin, Spring Boot, Elixir
        </div>
      </div>
    </div>,
    size,
  );
}
