export const site = {
  name: "Ákos Kappel",
  title: "Ing.",
  headline: "Full-Stack Software Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-taupe-eta-51.vercel.app",
  email: "kappelakos@gmail.com",
  location: "Bratislava, Slovakia",
  intro:
    "I build web and mobile products end to end: React and TypeScript frontends, Kotlin Spring Boot and Elixir Phoenix backends, and Kotlin Multiplatform apps for Android and iOS.",
  summary: [
    "I focus on fast, accessible interfaces, type-safe code and architectures that are easy to extend, from finding N+1 queries with flame graphs to polished animations.",
    "I pick up new stacks quickly when a project needs them (Elixir, Ruby, Kotlin Multiplatform), and lately I work more and more with AI.",
  ],
  availability: "Open to remote roles in the EU and hybrid roles in Slovakia.",
  links: {
    github: "https://github.com/AkosKappel",
    gitlab: "https://gitlab.com/AkosKappel",
    linkedin: "https://www.linkedin.com/in/%C3%A1kos-kappel-b53344220",
  },
  cv: [
    { language: "English", href: "/CV_Akos_Kappel_(EN).pdf" },
    { language: "Slovak", href: "/CV_Akos_Kappel_(SK).pdf" },
  ],
  languages: [
    { name: "Slovak", level: "Native" },
    { name: "Hungarian", level: "Native" },
    { name: "English", level: "C1" },
    { name: "German", level: "A2, relearning" },
  ],
  interests: ["Self-hosting", "Advent of Code", "Sports"],
} as const;

export const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/education", label: "Education" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
