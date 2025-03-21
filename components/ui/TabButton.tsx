import { motion } from "framer-motion";
import React from "react";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({
  active,
  selectTab,
  children,
}: {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}) => {
  const buttonClasses = active
    ? "bg-clip-text text-transparent bg-gradient-to-br from-teal-400 to-blue-500"
    : "text-gray-400";

  return (
    <button onClick={selectTab} className="mx-2">
      <p className={`mr-3 font-semibold ${buttonClasses}`}>{children}</p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 mt-2 mr-3 bg-gradient-to-br from-teal-400 to-blue-500"
      ></motion.div>
    </button>
  );
};

export default TabButton;
