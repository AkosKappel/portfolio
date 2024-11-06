import NavLink from "./NavLink";
import React from "react";

const MenuOverlay = ({
  links,
}: {
  links: { title: string; path: string; icon?: any }[];
}) => {
  return (
    <ul className="flex flex-col py-4 space-y-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} icon={link.icon} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
