"use client";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section id="hero">
      <div className="grid grid-cols-1 sm:grid-cols-12 md:m-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal">
            <span className="bg-clip-text">Hello, I&apos;m </span>
            <br />
            <TypeAnimation
              sequence={[
                "Ákos Kappel",
                3000,
                "a Full Stack Developer",
                3000,
                "a Software Engineer",
                3000,
              ]}
              wrapper="span"
              speed={20}
              repeat={Infinity}
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-teal-400 to-blue-500"
            />
          </h1>
          <p className="text-slate-300 mb-8 text-lg sm:text-xl lg:text-2xl mr-4">
            I&apos;m a passionate programmer with a great interest in coding,{" "}
            <br></br>solving problems, and everything tech-related.
          </p>
          <div className="flex justify-center sm:justify-start mb-8 gap-4">
            <a
              href="mailto:kappelakos@gmail.com"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-teal-400 to-blue-500 hover:bg-slate-800"
            >
              <span className="block hover:bg-slate-800 rounded-full px-5 py-2">
                Contact Me
              </span>
            </a>
            <a
              href="/CV_Akos_Kappel.pdf"
              download="CV_Akos_Kappel.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-teal-400 to-blue-500 hover:bg-slate-800"
            >
              <span className="block hover:bg-slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center"
        >
          <div className="rounded-full bg-slate-800 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative hidden sm:block">
            <Image
              src="/images/hero.jpeg"
              alt="hero image"
              className="fit-cover rounded-full"
              width={400}
              height={400}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
