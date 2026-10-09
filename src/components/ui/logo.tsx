/** The AK monogram, redrawn as a vector from the original logo files. */
export function Logo({ className = "size-8", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="35"
      >
        <circle cx="254.5" cy="260.5" r="191" strokeWidth="34" />
        <path d="M130 337 L182 190 Q189 172 196 190 L254 337 M146 298 H238" />
        <path d="M279.5 176 V337 M370 176 L302 268 M322 266 L381 337" />
      </g>
    </svg>
  );
}
