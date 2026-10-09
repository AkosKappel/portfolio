import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Page, PageHeader } from "@/components/ui/page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: how I work, what I care about, and what I do outside work.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Page>
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div>
          <PageHeader title="About me" lead={site.intro} />
          <div className="max-w-2xl space-y-5 text-lg">
            {site.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              The parts of the job I enjoy most are the ones users feel without noticing: a page
              that loads before you expect it to, search that understands a typo, a transition that
              shows where you came from, a form that works with a keyboard. I like designing a
              solution before writing it, and I like tests that let me change it later without fear.
            </p>
            <p>
              I grew up speaking Slovak and Hungarian, work in English, and I am relearning German.
              I studied computer science and intelligent software systems in Bratislava, where my
              master's thesis was{" "}
              <Link href="/projects/glaucoma-segmentation" className="link">
                a neural network for glaucoma screening
              </Link>
              .
            </p>
            <h2 className="pt-6 text-2xl font-semibold">Outside work</h2>
            <p>
              I run my demos on my own home server with Docker, Tailscale and nightly data resets, I
              solve{" "}
              <Link href="/projects/advent-of-code" className="link">
                Advent of Code
              </Link>{" "}
              every December in a different language, and I do sports to balance the screen time.
            </p>
          </div>
        </div>
        <div className="lg:pt-20">
          <Image
            src="/images/profile.webp"
            alt={`Portrait of ${site.name}`}
            width={900}
            height={1350}
            sizes="(min-width: 1024px) 20rem, 60vw"
            className="w-60 rounded-2xl border border-line lg:w-full"
            priority
          />
        </div>
      </div>
    </Page>
  );
}
