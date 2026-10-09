import DE from "country-flag-icons/react/3x2/DE";
import GB from "country-flag-icons/react/3x2/GB";
import HU from "country-flag-icons/react/3x2/HU";
import SK from "country-flag-icons/react/3x2/SK";

const flags = { en: GB, sk: SK, hu: HU, de: DE };

export type FlagCode = keyof typeof flags;

/** Small 3:2 flag; decorative, the language name is always written next to it. */
export function Flag({
  locale,
  className = "h-3.5 w-[1.3125rem]",
}: {
  locale: FlagCode;
  className?: string;
}) {
  const Component = flags[locale];
  return (
    <Component
      aria-hidden="true"
      className={`shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.12)] ${className}`}
    />
  );
}
