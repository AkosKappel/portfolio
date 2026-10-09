import type { Locale } from "@/i18n/routing";

/** Small flags for the language switcher. The English one is the Union Jack. */
export function Flag({ locale, className = "h-3.5 w-5" }: { locale: Locale; className?: string }) {
  return locale === "sk" ? (
    <SlovakFlag className={className} />
  ) : (
    <UnionJack className={className} />
  );
}

function UnionJack({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 60 30" className={`${className} rounded-[2px]`} aria-hidden>
      <clipPath id="flag-gb-clip">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <clipPath id="flag-gb-diagonals">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <g clipPath="url(#flag-gb-clip)">
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0 0l60 30m0-30L0 30"
          clipPath="url(#flag-gb-diagonals)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function SlovakFlag({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 900 600" className={`${className} rounded-[2px]`} aria-hidden>
      <path fill="#ee1c25" d="M0 0h900v600H0z" />
      <path fill="#0b4ea2" d="M0 0h900v400H0z" />
      <path fill="#fff" d="M0 0h900v200H0z" />
      {/* Coat of arms: red shield, white double cross, blue hills. */}
      <path
        fill="#fff"
        d="M393 141H251c-12 0-14 6-14 12 0 54 3 115 3 115 2 93 64 145 147 182 83-37 145-89 147-182 0 0 3-61 3-115 0-6-2-12-14-12H393z"
      />
      <path
        fill="#ee1c25"
        d="M387 434c-74-36-133-84-133-166 0-82 4-119 4-119h258s4 37 4 119c0 82-59 130-133 166z"
      />
      <path
        fill="#fff"
        d="M402 248c20 1 59 1 76-5 0 0-1 6-1 13s1 13 1 13c-16-6-35-6-76-5v47h-30v-47c-41-1-60-1-76 5 0 0 1-6 1-13s-1-13-1-13c17 6 56 6 76 5v-30c-18 0-44 1-73 10 0 0 1-6 1-13s-1-13-1-13c29 10 55 10 73 10-1-19-6-42-6-42h44s-5 23-6 42c18 0 44 0 73-10 0 0-1 6-1 13s1 13 1 13c-29-9-55-10-73-10v30z"
      />
      <path
        fill="#0b4ea2"
        d="M387 434c-43-21-87-49-108-91 8-17 23-27 39-27 19 0 29 17 35 31 5-17 19-32 34-32s29 15 34 32c6-14 16-31 35-31 16 0 31 10 39 27-21 42-65 70-108 91z"
      />
    </svg>
  );
}
