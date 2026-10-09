import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function trace(offset: number, noisy: boolean) {
  return Array.from({ length: 121 }, (_, i) => {
    const x = i * 10;
    const clean = Math.sin(i * 0.18 + offset) * 26 + Math.sin(i * 0.47 + offset * 2) * 10;
    const noise = noisy ? Math.sin(i * 2.7 + offset * 5) * 9 + Math.sin(i * 5.3) * 6 : 0;
    return `${i === 0 ? "M" : "L"}${x} ${(clean + noise).toFixed(1)}`;
  }).join(" ");
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f1f3f6",
        color: "#142233",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
        <div style={{ fontSize: 44, color: "#2146d0", marginTop: 8 }}>{site.headline}</div>
      </div>
      <svg width="1040" height="220" viewBox="0 -110 1200 220" style={{ display: "flex" }}>
        <title>Signal traces</title>
        <path
          d={trace(0, true)}
          transform="translate(0 -50)"
          fill="none"
          stroke="#d9700f"
          strokeWidth="4"
        />
        <path
          d={trace(1.3, false)}
          transform="translate(0 50)"
          fill="none"
          stroke="#2146d0"
          strokeWidth="4"
        />
      </svg>
      <div style={{ fontSize: 28, color: "#4f5d6e" }}>
        React, TypeScript, Kotlin, Elixir and WebGL
      </div>
    </div>,
    size,
  );
}
