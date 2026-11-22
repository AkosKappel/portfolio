/** A resolved logo without its path data, small enough to pass to client components. */
export type LogoRef = { kind: "path"; id: string; color?: string } | { kind: "image"; src: string };

export function LogoMark({ logo, className = "size-3.5" }: { logo: LogoRef; className?: string }) {
  if (logo.kind === "image") {
    // biome-ignore lint/performance/noImgElement: tiny static SVG logo, next/image adds nothing here
    return <img src={logo.src} alt="" className={`shrink-0 ${className}`} />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      // A style, not the fill attribute: the colour can be a light-dark() pair.
      style={{ fill: logo.color ?? "currentColor" }}
      aria-hidden
    >
      <use href={`/tech-icons.svg#${logo.id}`} />
    </svg>
  );
}
