import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { CopyButton } from "@/components/ui/copy-button";
import { CvMenu } from "@/components/ui/cv-menu";
import { Page, PageHeader } from "@/components/ui/page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}. ${site.availability}`,
  alternates: { canonical: "/contact" },
};

const profiles = [
  {
    href: site.links.linkedin,
    label: "LinkedIn",
    detail: "Work history and recommendations",
    Icon: LinkedInIcon,
  },
  {
    href: site.links.github,
    label: "GitHub",
    detail: "Personal projects and Advent of Code",
    Icon: GitHubIcon,
  },
  {
    href: site.links.gitlab,
    label: "GitLab",
    detail: "University and team projects",
    Icon: GitLabIcon,
  },
];

export default function ContactPage() {
  return (
    <Page>
      <PageHeader title="Contact" lead={site.availability} />
      <div className="grid gap-12 lg:grid-cols-2">
        <section aria-labelledby="email">
          <h2 id="email" className="sr-only">
            Email
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 font-display text-2xl font-semibold break-all hover:text-clean sm:text-4xl"
          >
            <Mail aria-hidden className="size-7 shrink-0" />
            {site.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <CopyButton value={site.email} label="Copy email address" />
            <CvMenu />
          </div>
          <p className="mt-10 inline-flex items-center gap-2 text-muted">
            <MapPin aria-hidden size={18} />
            {site.location}
          </p>
        </section>
        <section aria-labelledby="profiles">
          <h2 id="profiles" className="text-2xl font-semibold">
            Profiles
          </h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {profiles.map(({ href, label, detail, Icon }) => (
              <li key={label}>
                <a href={href} className="group flex items-center gap-4 py-4">
                  <Icon className="size-6 shrink-0" />
                  <span>
                    <span className="block font-medium group-hover:text-clean">{label}</span>
                    <span className="block text-sm text-muted">{detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Page>
  );
}
