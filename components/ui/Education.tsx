import {
  AcademicCapIcon,
  CalendarIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import educationData from "@/data/education.json";
import React from "react";

const Education = () => {
  return (
    <section>
      <div className="space-y-6">
        {educationData.map((edu, index: number) => (
          <div
            key={index}
            className="p-6 bg-slate-700 shadow-md rounded-md dark:bg-slate-900"
          >
            <h3 className="flex items-center text-2xl font-semibold text-white dark:text-slate-200">
              <AcademicCapIcon className="w-6 h-6 mr-2" />
              {edu.title}
            </h3>
            <p className="flex items-center text-slate-400 dark:text-slate-300 text-lg">
              <BookOpenIcon className="w-5 h-5 mr-2" />
              {edu.link ? (
                <a
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {edu.institution}
                </a>
              ) : (
                edu.institution
              )}
            </p>
            <p className="text-slate-300 dark:text-slate-400 mt-1">
              {edu.degree}
            </p>
            {edu.thesis && (
              <p className="text-slate-300 dark:text-slate-400 italic mt-2">
                <strong>Thesis:</strong> {edu.thesis}
              </p>
            )}
            <p className="flex items-center text-slate-400 dark:text-slate-300 mt-2">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {edu.dates}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
