import React from "react";

const ProjectTag = ({
  name,
  onClick,
  isSelected,
}: {
  name: string;
  onClick: (tag: string) => void;
  isSelected: boolean;
}) => {
  const buttonStyles = isSelected
    ? "text-white bg-gradient-to-br from-teal-400 to-blue-500"
    : "text-gray-400 border-slate-600 hover:border-white";
  return (
    <button
      className={`${buttonStyles} rounded-full border-2 px-8 py-3 text-xl cursor-pointer bg-gray-800`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
