import {
  BriefcaseIcon,
  CalendarIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import workExperienceData from "@/data/workExperience";
import React from "react";

const WorkExperience = () => {
  return (
    <section>
      <div className="space-y-6">
        {workExperienceData.map((job, index) => (
          <div
            key={index}
            className="p-6 bg-slate-700 shadow-md rounded-md dark:bg-slate-900"
          >
            <h3 className="flex items-center text-2xl font-semibold text-white dark:text-slate-200">
              <BriefcaseIcon className="w-6 h-6 mr-2" />
              {job.position}, {job.company}
            </h3>
            <p className="flex items-center text-slate-400 dark:text-slate-300 text-lg mt-1">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {job.dates}
            </p>
            <div className="mt-3">
              <h4 className="text-slate-300 dark:text-slate-400 font-semibold">
                Responsibilities:
              </h4>
              <ul className="list-disc ml-6 text-slate-300 dark:text-slate-400">
                {job.responsibilities.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>
            <div className="mt-3">
              <h4 className="flex items-center text-slate-300 dark:text-slate-400 font-semibold">
                <CodeBracketIcon className="w-5 h-5 mr-2" />
                Technologies:
              </h4>
              <p className="text-slate-400 dark:text-slate-300 ml-6">
                {job.technologies}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
