# Portfolio

Personal website of Ákos Kappel, full-stack software engineer: projects with case studies, experience, skills, education, contact and an HTML CV with PDF downloads in English and Slovak.

Live: https://portfolio-taupe-eta-51.vercel.app

## Stack

- Next.js 16 (App Router, every page statically generated), React 19, TypeScript
- Tailwind CSS 4 with design tokens in `src/app/globals.css`, light and dark themes
- WebGL2 for the signal animation on the home page
- TanStack Table and match-sorter for the projects archive (fuzzy search, filters and sorting kept in the URL)
- React `ViewTransition` for route and image transitions
- Biome for linting and formatting, Vitest for content checks, Playwright with axe for end-to-end and accessibility tests, Lighthouse CI

## Development

Requires Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run lint` | Biome lint and format check |
| `npm run check` | Biome with safe fixes applied |
| `npm run typecheck` | TypeScript |
| `npm test` | Vitest content and helper tests |
| `npm run build` | Production build |
| `npm run test:e2e` | Playwright against the production build (run `npm run build` first) |
| `npm run lighthouse` | Lighthouse CI against the production build |

GitHub Actions runs all of these on every push and pull request. Vercel builds and deploys `main`.

## Structure

```text
src/
  app/          routes, metadata, sitemap, robots, icon and Open Graph image
  components/   layout (header, footer, theme), home, projects, ui
  content/      typed site content: site, projects, experience, education, skills
  lib/          small helpers (date formatting)
test/e2e/       Playwright tests
latex/          CV source (English and Slovak)
```

## Editing content

All text lives in `src/content/`. Types are in `src/content/types.ts`, and `src/content/content.test.ts` checks slugs, image paths, links and dates.

### Adding a project

1. Take a screenshot at 1600 px width (16:10 works best on cards), convert it to WebP and save it as `public/images/projects/<slug>.webp`:

   ```bash
   magick screenshot.png -resize '1600x>' -quality 80 public/images/projects/<slug>.webp
   ```

2. Add an entry to `src/content/projects.ts`: `slug`, `title`, a one-sentence `summary`, `description` paragraphs, `kind`, `area`, `year`, `stack`, links and `image` with its real width and height. Set `upgraded` when an old project is brought up to date and `featured` to show it on the home page.
3. Run `npm test`. The card, case-study page, sitemap entry, search and filters follow from the entry.

Projects without a screenshot get a generated placeholder.

## CV

The CV source is LaTeX in `latex/` (`main-english.tex`, `main-slovak.tex`, A4, two pages). Build it and copy the PDFs to `public/`:

```bash
cd latex && latexmk -pdf main-english.tex main-slovak.tex
cp main-english.pdf "../public/CV_Akos_Kappel_(EN).pdf"
cp main-slovak.pdf "../public/CV_Akos_Kappel_(SK).pdf"
```

The public CV contains no phone number, birth date or street address. The `/cv` page renders the same content from `src/content/`.
