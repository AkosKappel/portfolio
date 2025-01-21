import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectCard = ({
  imgUrl,
  title,
  description,
  stack,
  gitUrl,
  previewUrl,
}: {
  imgUrl: string;
  title: string;
  description: string;
  stack: string[];
  gitUrl?: string;
  previewUrl?: string;
}) => {
  return (
    <div>
      <div className="h-52 md:h-72 rounded-t-xl relative group bg-gray-800">
        <div className="relative w-full h-full">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="rounded-t-xl object-contain"
          />
        </div>
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
          {gitUrl && (
            <Link
              href={gitUrl}
              className="h-14 w-14 mr-2 border-2 relative rounded-full border-gray-400 hover:border-white group/link"
              target="_blank"
            >
              <CodeBracketIcon
                title="Open source code"
                className="h-10 w-10 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white"
              />
            </Link>
          )}
          {previewUrl && (
            <Link
              href={previewUrl}
              className="h-14 w-14 border-2 relative rounded-full border-gray-400 hover:border-white group/link"
              target="_blank"
            >
              <EyeIcon
                title="Go to preview"
                className="h-10 w-10 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white"
              />
            </Link>
          )}
        </div>
      </div>
      <div className="text-white rounded-b-xl bg-slate-600 py-6 px-4">
        <h4 className="text-xl font-semibold italic mb-2">
          {previewUrl ? (
            <Link href={previewUrl} className="hover:underline hover:text-teal-400" target="_blank">
              {title}
            </Link>
          ) : (
            title
          )}
        </h4>
        <p className="text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {stack.map((item) => (
            <span
              key={item}
              className="font-bold text-xl border-gray-300 border-2 py-2 px-4 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 text-transparent bg-clip-text"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
