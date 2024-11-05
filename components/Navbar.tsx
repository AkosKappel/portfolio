"use client";
import {
  Bars3Icon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import MenuOverlay from "@/components/ui/MenuOverlay";
import NavLink from "@/components/ui/NavLink";
import React, { useState } from "react";
import Link from "next/link";

const navLinks = [
  {
    title: "About Me",
    path: "#about",
    icon: <InformationCircleIcon className="w-6 h-6" />,
  },
  {
    title: "Projects",
    path: "#projects",
    icon: <Bars3Icon className="w-6 h-6" />,
  },
];

const Navbar = () => {
  const [isNavbarOpen, setNavbarOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-gray-800 shadow">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="mx-2 text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-pink-600"
        >
          Ákos&apos;s Portfolio
        </Link>
        <div className="mobile-menu block md:hidden">
          {!isNavbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} icon={link.icon} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isNavbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
