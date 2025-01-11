"use client";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectTag from "@/components/ui/ProjectTag";
import { motion, useInView } from "framer-motion";
import projectsData from "@/data/projects.json";
import React, { useState, useRef } from "react";

const Projects = () => {
  const [tag, setTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(projectsRef, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
    setCurrentPage(0);
    scrollToSection();
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    scrollToSection();
  };

  const scrollToSection = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tags = [
    ...new Set(["All", ...projectsData.flatMap((project) => project.tag)]),
  ];

  const filteredProjects = projectsData.filter(
    (project) => tag === "All" || project.tag.includes(tag),
  );

  const projectsPerPage = 6;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginatedProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage,
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" ref={projectsRef}>
      <h2 className="text-center text-4xl font-bold">My Projects</h2>
      <div className="flex flex-row flex-wrap justify-center items-center gap-2 py-12">
        {tags.map((tagName) => (
          <ProjectTag
            key={tagName}
            onClick={handleTagChange}
            name={tagName}
            isSelected={tag === tagName}
          />
        ))}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {paginatedProjects.map((project, index) => (
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
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex)}
              className={`w-4 h-4 rounded-full ${
                currentPage === pageIndex
                  ? "bg-gradient-to-br from-teal-400 to-blue-500"
                  : "bg-gray-400"
              }`}
              aria-label={`Go to page ${pageIndex + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
