"use client";

import NextError from "next/error";

// Requests outside any locale (rare, the proxy adds one) get the plain Next.js 404.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
