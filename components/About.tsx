"use client";
import WorkExperience from "@/components/ui/WorkExperience";
import React, { useTransition, useState } from "react";
import TabButton from "@/components/ui/TabButton";
import Education from "@/components/ui/Education";
import Socials from "@/components/ui/Socials";
import Skills from "@/components/ui/Skills";
import { motion } from "framer-motion";
import Image from "next/image";

const Tabs = [
  {
    title: "Skills",
    id: "skills",
    content: <Skills />,
  },
  {
    title: "Education",
    id: "education",
    content: <Education />,
  },
  {
    title: "Work Experience",
    id: "work",
    content: <WorkExperience />,
  },
];

const About = () => {
  const [currentTab, setCurrentTab] = useState(Tabs[0].id);
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setCurrentTab(id);
    });
  };

  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="md:grid lg:grid-cols-3 gap-8 align-top"
      >
        <Image
          src="/images/profile-picture.png"
          alt="Profile Picture"
          width={320}
          height={320}
          className="rounded-full hidden lg:block shadow-lg bg-gradient-to-br from-teal-400 to-blue-500 p-2 mx-auto md:my-16"
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full col-span-2">
          <h2 className="text-4xl font-bold text-white mb-8">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with frontend libraries like React, Next.js, Vue and
            Nuxt.js. I am familiar with larger frameworks such as Express.js,
            Django and Laravel. For data management I like to use PostgreSQL or
            MongoDB. I am also familiar with HTML, CSS, Docker and Git. My core
            programming languages include TypeScript, Python, and PHP. I am a
            team player, who can also work well individually, I consider myself
            a quick learner and I am always looking to expand my knowledge and
            skill set by looking for new challenges.
          </p>
          <Image
            src="/images/profile-picture.png"
            alt="Profile Picture"
            width={320}
            height={320}
            className="rounded-full block lg:hidden shadow-lg bg-gradient-to-br from-teal-400 to-blue-500 p-2 mx-auto my-8"
          />
          <Socials />
          <div className="flex flex-row sm:justify-start mt-8 text-xl flex-wrap justify-center">
            {Tabs.map((t) => (
              <TabButton
                key={t.id}
                selectTab={() => handleTabChange(t.id)}
                active={currentTab === t.id}
              >
                <h3 className="font-semibold transition duration-300 ease-in-out hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-br hover:from-teal-400 hover:to-blue-500">
                  {t.title}
                </h3>
              </TabButton>
            ))}
          </div>
          <div className="mt-8 min-h-96">
            {!isPending && Tabs.find((t) => t.id === currentTab)?.content}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
