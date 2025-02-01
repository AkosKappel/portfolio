import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaGitlab } from "react-icons/fa";
import personalData from "@/data/personal";

const Socials = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-row justify-start gap-12 flex-wrap m-8 lg:my-12">
      <a
        href={personalData.githubUrl}
        className="hover:text-teal-400 flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className="h-12 w-12 mr-2" />
        <span>GitHub</span>
      </a>
      <a
        href={personalData.gitlabUrl}
        className="hover:text-teal-400 flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGitlab className="h-12 w-12 mr-2" />
        <span>GitLab</span>
      </a>
      <a
        href={personalData.linkedinUrl}
        className="hover:text-teal-400 flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin className="h-12 w-12 mr-2" />
        <span>LinkedIn</span>
      </a>
      <button
        onClick={copyEmail}
        className="hover:text-teal-400 flex items-center"
      >
        <EnvelopeIcon className="h-12 w-12 mr-2" />
        {copied ? (
          <>
            <ClipboardIcon className="h-6 w-6 mr-2 animate-pulse" />
            <span className="animate-pulse">Copied!</span>
          </>
        ) : (
          <span className="text-left">
            Email
            <br />
            <i>(click to copy)</i>
          </span>
        )}
      </button>
    </div>
  );
};

export default Socials;
