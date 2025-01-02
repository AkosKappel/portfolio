import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import LinkedinIcon from "@/public/icons/linkedin.svg";
import GithubIcon from "@/public/icons/github.svg";
import React, { useState } from "react";
import Image from "next/image";

const Socials = () => {
  const githubUrl = "https://github.com/AkosKappel";
  const linkedinUrl = "https://www.linkedin.com/in/%C3%A1kos-kappel-b53344220";
  const email = "kappelakos@gmailcom";

  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-row justify-start gap-8 flex-wrap m-8">
      <a
        href={githubUrl}
        className="hover:text-blue-400 flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={GithubIcon}
          width={48}
          height={48}
          alt="GitHub"
          className="mr-2"
        />
        GitHub
      </a>
      <a
        href={linkedinUrl}
        className="hover:text-blue-400 flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={LinkedinIcon}
          width={48}
          height={48}
          alt="LinkedIn"
          className="mr-2"
        />
        LinkedIn
      </a>
      <button
        onClick={copyEmail}
        className="hover:text-blue-400 flex items-center"
      >
        <EnvelopeIcon className="h-12 w-12 mr-2" />
        {copied ? (
          <>
            <ClipboardIcon className="h-6 w-6 mr-2 animate-pulse" />
            <span className="animate-pulse">Copied!</span>
          </>
        ) : (
          <span>
            Email <i>(click to copy)</i>
          </span>
        )}
      </button>
    </div>
  );
};

export default Socials;
