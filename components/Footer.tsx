import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React from "react";
import personalData from "@/data/personal";
import { FaGithub, FaLinkedin, FaGitlab } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">
          Made with ❤️ by {personalData.name}. © {currentYear}
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href={personalData.githubUrl}
            className="hover:text-teal-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-6 w-6 mr-2" />
            <span>GitHub</span>
          </a>
          <a
            href={personalData.gitlabUrl}
            className="hover:text-teal-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGitlab className="h-6 w-6 mr-2" />
            <span>GitLab</span>
          </a>
          <a
            href={personalData.linkedinUrl}
            className="hover:text-teal-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-6 w-6 mr-2" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${personalData.email}`}
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
