import Link from "next/link";
import { SignalCanvas } from "@/components/home/signal-canvas";
import { ProjectCard } from "@/components/projects/project-card";
import { CvMenu } from "@/components/ui/cv-menu";
import { Page, StackList } from "@/components/ui/page";
import { jobs } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { formatMonth } from "@/lib/format";

export default function HomePage() {
  const currentJob = jobs[0];
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.headline,
    email: `mailto:${site.email}`,
    url: site.url,
    address: { "@type": "PostalAddress", addressLocality: "Bratislava", addressCountry: "SK" },
    alumniOf: "Slovak University of Technology in Bratislava",
    sameAs: Object.values(site.links),
  };

  return (
    <Page>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from static site data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <section className="grid items-center gap-10 pt-12 pb-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
        <div>
          <h1 className="text-5xl font-semibold sm:text-7xl">{site.name}</h1>
          <p className="mt-4 font-display text-2xl text-clean sm:text-3xl">{site.headline}</p>
          <p className="mt-6 max-w-xl text-lg text-muted">{site.intro}</p>
          <div className="mt-8 flex flex-wrap items-start gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition-colors hover:bg-clean"
            >
              See projects
            </Link>
            <CvMenu />
          </div>
        </div>
        <figure>
          <div className="relative h-72 overflow-hidden rounded-xl border border-line bg-surface sm:h-96">
            <SignalCanvas />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            <span className="text-raw">Raw</span> and <span className="text-clean">filtered</span>{" "}
            signals, drawn with WebGL. Move your pointer across them to move the filter.
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="selected-work" className="pt-12">
        <div className="flex items-end justify-between gap-6">
          <h2 id="selected-work" className="text-3xl font-semibold sm:text-4xl">
            Selected projects
          </h2>
          <Link href="/projects" className="link shrink-0 text-muted">
            All projects
          </Link>
        </div>
        <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} sizes="(min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="current-work"
        className="mt-24 grid gap-8 border-t border-line pt-12 lg:grid-cols-[1fr_2fr]"
      >
        <div>
          <h2 id="current-work" className="text-3xl font-semibold sm:text-4xl">
            Work right now
          </h2>
          <p className="mt-3 text-muted">
            {currentJob.role} at {currentJob.company}, since {formatMonth(currentJob.start)}.
          </p>
          <Link href="/experience" className="link mt-4 inline-block">
            Full experience
          </Link>
        </div>
        <ul className="grid gap-8 sm:grid-cols-2">
          {currentJob.items.map((item) => (
            <li key={item.name}>
              <h3 className="text-xl font-semibold">
                {item.url ? (
                  <a href={item.url} className="hover:text-clean">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.context}</p>
              <p className="mt-2">{item.summary}</p>
              <StackList items={item.stack} className="mt-3" />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="contact"
        className="mt-24 rounded-2xl bg-ink px-6 py-12 text-paper sm:px-12 dark:border dark:border-line dark:bg-surface dark:text-ink"
      >
        <h2 id="contact" className="text-3xl font-semibold sm:text-4xl">
          Let's talk
        </h2>
        <p className="mt-3 max-w-xl text-paper/75 dark:text-muted">{site.availability}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-paper px-5 py-2.5 font-medium text-ink transition-colors hover:bg-raw dark:bg-ink dark:text-paper"
          >
            Email me
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-paper/30 px-5 py-2.5 font-medium hover:border-paper dark:border-ink/30 dark:hover:border-ink"
          >
            Other ways to reach me
          </Link>
        </div>
      </section>
    </Page>
  );
}
