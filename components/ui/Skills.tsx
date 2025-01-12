import JavascriptIcon from "@/public/icons/javascript.svg";
import TensorflowIcon from "@/public/icons/tensorflow.svg";
import TypescriptIcon from "@/public/icons/typescript.svg";
import TailwindIcon from "@/public/icons/tailwindcss.svg";
import BootstrapIcon from "@/public/icons/bootstrap.svg";
import ExpressIcon from "@/public/icons/express-js.svg";
import PostgresIcon from "@/public/icons/postgres.svg";
import SlovakiaIcon from "@/public/icons/slovakia.svg";
import PyTorchIcon from "@/public/icons/pytorch.svg";
import LaravelIcon from "@/public/icons/laravel.svg";
import FastapiIcon from "@/public/icons/fastapi.svg";
import MongoDBIcon from "@/public/icons/mongodb.svg";
import HungaryIcon from "@/public/icons/hungary.svg";
import GermanyIcon from "@/public/icons/germany.svg";
import EnglishIcon from "@/public/icons/english.svg";
import DjangoIcon from "@/public/icons/django.svg";
import KotlinIcon from "@/public/icons/kotlin.svg";
import PythonIcon from "@/public/icons/python.svg";
import CSharpIcon from "@/public/icons/csharp.svg";
import DockerIcon from "@/public/icons/docker.svg";
import VscodeIcon from "@/public/icons/vscode.svg";
import GitlabIcon from "@/public/icons/gitlab.svg";
import NuxtIcon from "@/public/icons/nuxt-js.svg";
import NextIcon from "@/public/icons/next-js.svg";
import NodeIcon from "@/public/icons/nodejs.svg";
import ReactIcon from "@/public/icons/react.svg";
import RedisIcon from "@/public/icons/redis.svg";
import LinuxIcon from "@/public/icons/linux.svg";
import VueIcon from "@/public/icons/vue-js.svg";
import JavaIcon from "@/public/icons/java.svg";
import HtmlIcon from "@/public/icons/html.svg";
import JiraIcon from "@/public/icons/jira.svg";
import GitIcon from "@/public/icons/git.svg";
import PhpIcon from "@/public/icons/php.svg";
import CssIcon from "@/public/icons/css.svg";
import Image from "next/image";
import React from "react";

const Skills = () => {
  const skillsData = [
    {
      title: "Programming Languages",
      items: [
        { icon: PythonIcon, name: "Python" },
        { icon: TypescriptIcon, name: "TypeScript" },
        { icon: JavascriptIcon, name: "JavaScript" },
        { icon: PhpIcon, name: "PHP" },
        { icon: JavaIcon, name: "Java" },
        { icon: KotlinIcon, name: "Kotlin" },
        { icon: CSharpIcon, name: "C#" },
      ],
    },
    {
      title: "Developer Tools",
      items: [
        { icon: GitIcon, name: "Git" },
        { icon: LinuxIcon, name: "Linux" },
        { icon: DockerIcon, name: "Docker" },
        { icon: VscodeIcon, name: "VS Code" },
        { icon: JiraIcon, name: "Jira" },
        { icon: GitlabIcon, name: "Gitlab" },
      ],
    },
    {
      title: "Web Technologies",
      items: [
        { icon: HtmlIcon, name: "HTML" },
        { icon: CssIcon, name: "CSS" },
        { icon: TailwindIcon, name: "Tailwind" },
        { icon: BootstrapIcon, name: "Bootstrap" },
      ],
    },
    {
      title: "Frameworks",
      items: [
        { icon: LaravelIcon, name: "Laravel" },
        { icon: NodeIcon, name: "Node.js" },
        { icon: FastapiIcon, name: "FastAPI" },
        { icon: ExpressIcon, name: "Express" },
        { icon: DjangoIcon, name: "Django" },
        { icon: ReactIcon, name: "React" },
        { icon: NextIcon, name: "Next.js" },
        { icon: VueIcon, name: "Vue" },
        { icon: NuxtIcon, name: "Nuxt" },
      ],
    },
    {
      title: "Databases",
      items: [
        { icon: PostgresIcon, name: "PostgreSQL" },
        { icon: MongoDBIcon, name: "MongoDB" },
        { icon: RedisIcon, name: "Redis" },
      ],
    },
    {
      title: "AI Libraries",
      items: [
        { icon: PyTorchIcon, name: "PyTorch" },
        { icon: TensorflowIcon, name: "TensorFlow" },
      ],
    },
    {
      title: "Language Skills",
      items: [
        { icon: SlovakiaIcon, name: "Slovak - Native" },
        { icon: EnglishIcon, name: "English - C1" },
        { icon: GermanyIcon, name: "German - A2" },
        { icon: HungaryIcon, name: "Hungarian - C1" },
      ],
    },
  ];

  return (
    <section>
      <div className="space-y-6">
        {skillsData.map((section: any, index: number) => (
          <div
            key={index}
            className="p-6 bg-slate-700 shadow-md rounded-md dark:bg-slate-900"
          >
            <h3 className="flex items-center text-2xl font-semibold text-white dark:text-slate-200 mb-4">
              {section.icon && (
                <Image
                  src={section.icon}
                  alt={section.title}
                  width={24}
                  height={24}
                  className="mr-2"
                />
              )}
              {section.title}
            </h3>
            <ul className="flex flex-wrap gap-8">
              {section.items.map(
                (item: { icon: any; name: string }, index: number) => (
                  <li
                    key={index}
                    className="flex flex-col items-center justify-between text-center text-slate-300 dark:text-slate-400"
                  >
                    {item.icon && (
                      <Image
                        src={item.icon}
                        width={48}
                        height={48}
                        alt={item.name}
                      />
                    )}
                    <span className="text-sm">{item.name}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
