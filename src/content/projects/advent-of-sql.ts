import type { Project } from "../types";

export const adventOfSql: Project = {
  slug: "advent-of-sql",
  title: "Advent of SQL",
  summary: {
    en: "Daily database puzzles solved in PostgreSQL.",
    sk: "Denné databázové úlohy riešené v PostgreSQL.",
  },
  description: [
    {
      en: "Advent of SQL is a December challenge in the style of Advent of Code, but every puzzle is a database: each day brings a PostgreSQL dump about Santa's workshop and a question that has to be answered with a query.",
      sk: "Advent of SQL je decembrová výzva v štýle Advent of Code, ale každá úloha je databáza: každý deň prinesie PostgreSQL dump o Santovej dielni a otázku, na ktorú treba odpovedať dotazom.",
    },
    {
      en: "I solved the first twelve days of the 2024 edition in plain SQL. The puzzles go beyond joins and grouping and call for window functions, recursive queries and working with JSON and XML.",
      sk: "Vyriešil som prvých dvanásť dní ročníka 2024 v čistom SQL. Úlohy idú nad rámec spájania a zoskupovania tabuliek a vyžadujú okenné funkcie, rekurzívne dotazy a prácu s JSON a XML.",
    },
  ],
  technical: [
    {
      en: "Window functions such as LAG and ROW_NUMBER for comparing rows with their neighbours and ranking within groups",
      sk: "Okenné funkcie ako LAG a ROW_NUMBER na porovnanie riadkov so susedmi a poradie v rámci skupín",
    },
    {
      en: "A recursive CTE to walk a management hierarchy",
      sk: "Rekurzívne CTE na prechod hierarchiou manažérov",
    },
    {
      en: "Querying JSONB columns and XML documents with XPath, and unnesting arrays into rows",
      sk: "Dotazy nad JSONB stĺpcami a XML dokumentmi cez XPath a rozbalenie polí do riadkov",
    },
  ],
  kind: "personal",
  areas: ["challenges"],
  year: 2024,
  stack: ["PostgreSQL"],
  repoUrl: "https://github.com/AkosKappel/Advent-of-SQL",
  image: {
    src: "/images/projects/aosql.webp",
    width: 764,
    height: 782,
    alt: { en: "Advent of SQL challenge page", sk: "Stránka výzvy Advent of SQL" },
  },
};
