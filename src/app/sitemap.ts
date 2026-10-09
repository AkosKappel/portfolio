import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { navigation, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...navigation.map((item) => item.href), "/cv"];
  return [
    ...pages.map((path) => ({ url: new URL(path, site.url).toString() })),
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, site.url).toString(),
    })),
  ];
}
