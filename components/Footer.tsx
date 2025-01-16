import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React from "react";
import info from "@/data/info";
import { FaGithub, FaLinkedin, FaGitlab } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">
          Made with ❤️ by {info.name}. © {currentYear}
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href={info.githubUrl}
            className="hover:text-teal-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-6 w-6 mr-2" />
            <span>GitHub</span>
          </a>
          <a
            href={info.gitlabUrl}
            className="hover:text-teal-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGitlab className="h-6 w-6 mr-2" />
            <span>GitLab</span>
          </a>
          <a
            href={info.linkedinUrl}
            className="hover:text-teal-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-6 w-6 mr-2" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${info.email}`}
            className="hover:text-teal-400 flex items-center"
          >
            <EnvelopeIcon className="h-6 w-6 mr-2" />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
