# Portfolio

Personal portfolio website of Ákos Kappel: about me, skills, education, work experience and projects, with downloadable CVs in English and Slovak.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content

All content lives in `data/`:

| File | Content |
| --- | --- |
| `personal.ts` | Name, e-mail, social links |
| `projects.ts` | Project cards (screenshots in `public/images/projects/`) |
| `skills.ts` | Skill groups (icons in `public/icons/`) |
| `workExperience.ts` | Work experience |
| `education.ts` | Education |

## CV

The CV source is LaTeX in `latex/` (`main-english.tex`, `main-slovak.tex`). Build it with `latexmk -pdf` and copy the PDFs to `public/CV_Akos_Kappel_(EN).pdf` and `public/CV_Akos_Kappel_(SK).pdf`. Build artefacts are ignored by git.
