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
      en: "I solved the first eleven days of the 2024 edition in plain SQL, one file per day with the answer noted under the query. The puzzles go beyond joins and grouping and call for window functions, recursive queries and working with JSON and XML.",
      sk: "Vyriešil som prvých jedenásť dní ročníka 2024 v čistom SQL, každý deň v jednom súbore s odpoveďou zapísanou pod dotazom. Úlohy idú nad rámec spájania a zoskupovania tabuliek a vyžadujú okenné funkcie, rekurzívne dotazy a prácu s JSON a XML.",
    },
  ],
  technical: [
    {
      en: "Window functions such as LAG and ROW_NUMBER for comparing rows with their neighbours and ranking within groups",
      sk: "Okenné funkcie ako LAG a ROW_NUMBER na porovnanie riadkov so susedmi a poradie v rámci skupín",
    },
    {
      en: "A moving average over the last three seasons with a ROWS BETWEEN window frame",
      sk: "Kĺzavý priemer za posledné tri sezóny pomocou okna ROWS BETWEEN",
    },
    {
      en: "A recursive CTE to walk a management hierarchy and find how deep it goes",
      sk: "Rekurzívne CTE na prechod hierarchiou manažérov a zistenie jej hĺbky",
    },
    {
      en: "XML menus stored in three different schema versions, told apart with xpath_exists and read with XPath",
      sk: "XML menu uložené v troch rôznych verziách schémy, rozlíšené cez xpath_exists a čítané cez XPath",
    },
    {
      en: "Reading values from JSONB columns, and comparing arrays with EXCEPT and INTERSECT to find added, kept and removed tags",
      sk: "Čítanie hodnôt z JSONB stĺpcov a porovnanie polí cez EXCEPT a INTERSECT na nájdenie pridaných, zachovaných a odstránených značiek",
    },
    {
      en: "Decoding a hidden message by filtering character codes and joining them with string_agg",
      sk: "Dekódovanie skrytej správy filtrovaním kódov znakov a ich spojením cez string_agg",
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
