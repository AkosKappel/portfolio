import { EnvelopeIcon } from "@heroicons/react/24/outline";
import LinkedinIcon from "@/public/icons/linkedin.svg";
import GithubIcon from "@/public/icons/github.svg";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const githubUrl = "https://github.com/AkosKappel";
  const linkedinUrl = "https://www.linkedin.com/in/%C3%A1kos-kappel-b53344220";

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">Made with ❤️ by Ákos Kappel. © 2024</p>
        <div className="flex justify-center space-x-6">
          <a
            href={githubUrl}
            className="hover:text-blue-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={GithubIcon}
              width={24}
              height={24}
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
              width={24}
              height={24}
              alt="LinkedIn"
              className="mr-2"
            />
            LinkedIn
          </a>
          <a
            href="mailto:kappelakos@gmail.com"
            className="hover:text-blue-400 flex items-center"
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
