import Link from "next/link";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { navigation, site } from "@/content/site";

const socials = [
  { href: site.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: site.links.gitlab, label: "GitLab", Icon: GitLabIcon },
  { href: site.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="font-display text-xl font-semibold">{site.name}</p>
          <p className="mt-2 text-muted">{site.availability}</p>
          <a href={`mailto:${site.email}`} className="link mt-4 inline-block">
            {site.email}
          </a>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-muted">Pages</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-clean">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cv" className="hover:text-clean">
                CV
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-normal text-muted">Elsewhere</h2>
          <ul className="mt-3 space-y-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} className="inline-flex items-center gap-2 hover:text-clean">
                  <Icon className="size-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 pb-10 text-sm text-muted sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          Built with Next.js, React and WebGL.{" "}
          <a href="https://github.com/AkosKappel/portfolio" className="link">
            Source code
          </a>
        </p>
      </div>
    </footer>
  );
}
