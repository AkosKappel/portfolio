import React from "react";
import NavItem from "@/components/ui/NavItem";

const MenuOverlay = ({ links }: { links: { title: string; path: string; icon?: any }[] }) => {
  return (
    <ul className="flex flex-col py-4 space-y-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavItem href={link.path} title={link.title} icon={link.icon} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
