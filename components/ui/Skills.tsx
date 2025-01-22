import Image from "next/image";
import React from "react";
import skillsData from "@/data/skills";

const Skills = () => {
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
