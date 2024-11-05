"use client";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectTag from "@/components/ui/ProjectTag";
import { motion, useInView } from "framer-motion";
import projectsData from "@/data/projects.json";
import React, { useState, useRef } from "react";

const Projects = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const tags = [
    ...new Set(["All", ...projectsData.flatMap((project) => project.tag)]),
  ];

  const filteredProjects = projectsData.filter(
    (project) => tag === "All" || project.tag.includes(tag),
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold">My Projects</h2>
      <div className="flex flex-row flex-wrap justify-center items-center gap-2 py-12">
        {tags.map((tagName: string) => (
          <ProjectTag
            key={tagName}
            onClick={handleTagChange}
            name={tagName}
            isSelected={tag === tagName}
          />
        ))}
      </div>
      <ul
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      >
        {filteredProjects.map((project, index: number) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.25 }}
          >
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              stack={project.stack}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
