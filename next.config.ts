import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Static pages cannot carry per-request nonces, and Next.js streams its payload in
// inline scripts, so scripts stay limited to this origin plus inline code.
// React needs eval() only in development, to rebuild call stacks for error overlays.
const isDev = process.env.NODE_ENV === "development";
// The chat assistant (see src/lib/assistant.ts) talks to its Worker and loads Cloudflare
// Turnstile, which runs in an iframe. Both are allowed only when the chat is enabled.
const assistantUrl = process.env.NEXT_PUBLIC_ASSISTANT_URL;
const turnstile = assistantUrl ? " https://challenges.cloudflare.com" : "";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com${turnstile}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://vitals.vercel-insights.com${assistantUrl ? ` ${new URL(assistantUrl).origin}` : ""}`,
  // The CV viewer frames its own PDFs, so frames stay allowed from this origin.
  `frame-src 'self'${turnstile}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Logos change only with a deploy; a day in the cache spares a request per page load.
        source: "/tech-icons.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        // The CV viewer at /cv/pdf frames the PDFs; a later match replaces the header above.
        source: "/:file(CV_.*\\.pdf)",
        headers: [{ key: "Content-Security-Policy", value: "frame-ancestors 'self'" }],
      },
    ];
  },
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
