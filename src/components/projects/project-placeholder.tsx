/** Shown for projects without a screenshot: a quiet trace drawn from the title. */
export function ProjectPlaceholder({ title }: { title: string }) {
  const seed = [...title].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const points = Array.from({ length: 41 }, (_, i) => {
    const x = (i / 40) * 320;
    const y = 100 + Math.sin(i * 0.45 + seed) * 28 + Math.sin(i * 1.3 + seed * 0.7) * 12;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="absolute inset-0 grid place-items-center bg-paper">
      <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
        <polyline points={points} fill="none" strokeWidth="2" className="stroke-clean/70" />
      </svg>
      <span className="absolute bottom-3 left-4 font-display text-lg font-semibold text-muted">
        {title}
      </span>
    </div>
  );
}
