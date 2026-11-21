import { checkDemos } from "@/lib/demo-status";

// Checked on request rather than at build time, so a build never depends on the home
// server. The CDN keeps the answer for five minutes, so a visitor rarely waits for the
// check and the demos see a handful of requests an hour, not one per page view.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    { checkedAt: new Date().toISOString(), demos: await checkDemos() },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300" } },
  );
}
