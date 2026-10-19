import { iconId } from "@/lib/tech-icons";
import { techIcons } from "@/lib/tech-icons.data";

export const dynamic = "force-static";

// One cached sprite instead of inline paths: the same logos repeat across cards, and inline
// they were sent twice per page (HTML and React payload), which made hydration slow on phones.
export function GET() {
  const symbols = Object.entries(techIcons)
    .map(
      ([name, icon]) =>
        `<symbol id="${iconId(name)}" viewBox="0 0 24 24"><path d="${icon.path}"/></symbol>`,
    )
    .join("");
  return new Response(`<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
