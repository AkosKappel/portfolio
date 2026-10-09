import Link from "next/link";
import { Page } from "@/components/ui/page";
import { navigation } from "@/content/site";

export default function NotFound() {
  return (
    <Page className="py-24">
      <p className="font-display text-xl text-raw">404</p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-6xl">This page does not exist</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        The link may be old or mistyped. These pages do exist:
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        <li>
          <Link
            href="/"
            className="inline-block rounded-full bg-ink px-4 py-2 text-paper hover:bg-clean"
          >
            Home
          </Link>
        </li>
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-block rounded-full border border-line px-4 py-2 hover:border-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
