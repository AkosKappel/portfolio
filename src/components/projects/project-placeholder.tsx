import { Logo } from "@/components/ui/logo";

/** Shown for projects without a screenshot. */
export function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-accent-soft">
      <Logo className="size-16 text-accent/40" />
      <span className="absolute bottom-3 left-4 font-display text-lg font-semibold text-muted">
        {title}
      </span>
    </div>
  );
}
