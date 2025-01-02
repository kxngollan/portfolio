"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import headshot from "./image/headshot.jpg";
import Technology from "./Technology";
import "./About.css";
import Image from "next/image";

const About = () => {
  const [section, setSection] = useState("");

  const parentVariants = {
    initial: {},
    animate: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.4,
      },
    },
  };

  const childVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.main
      initial="initial"
      animate="animate"
      variants={parentVariants}
      className="about"
    >
      <div className="row">
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="about-col-1"
        >
          <Image src={headshot} alt="photo of me" loading="lazy" />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="about-col-2"
        >
          <h1 className="sub-title">About Me</h1>
          <p>
            I am a highly motivated web developer with a year{`'`}s worth of
            professional experience, driven by an unyielding passion for coding.
            My journey began with a Mathematics Degree from the University of
            Leicester, where I quickly discerned that software development was
            the career path I was destined for. I am dedicated to continuous
            learning, constantly seeking ways to optimize and enhance my code
            for peak efficiency. Beyond the realm of programming, I indulge in
            strategic pursuits such as chess, relish the challenge of
            basketball, and find inspiration in exploring new destinations
            through travel.
          </p>

          <div className="tab-titles">
            <p
              className="tab-links"
              onClick={() =>
                section !== "experience"
                  ? setSection("experience")
                  : setSection("")
              }
            >
              Experience
            </p>
            <p
              className="tab-links"
              onClick={() =>
                section !== "education"
                  ? setSection("education")
                  : setSection("")
              }
            >
              Education
            </p>
          </div>
          {section == "experience" ? (
            <div className="tab-contents" id="Experience">
              <ul>
                <li>
                  <span>Sept 2023 - Jun 2024 </span>
                </li>
                <li>
                  <span>Aside of Code Juniour Developer training:</span>
                </li>
                <li>
                  Collaborate in the end-to-end development and maintenance of
                  innovative web applications, utilising a diverse tech stack
                  including React.js and Node.js
                </li>
                <li>
                  Collaborated with cross-functional teams, including business
                  analysts, project managers, and end- users to gather
                  requirements, design, and develop solutions to improve
                  business processes and increase efficiency.
                </li>
                <li>
                  Conducted testing, troubleshooting, and debugging to ensure
                  smooth operation and high performance of the software
                  applications.
                </li>
                <li>
                  Participation in code input reviews and contributed to the
                  development of coding standards and best practices.
                </li>
                <li>
                  Manage version control using git/github to manage application
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
          {section == "education" ? (
            <div className="tab-contents" id="Education">
              <ul>
                <li>
                  <span>University of Leicester</span>
                  <br />
                  BSc Mathematics
                </li>
                <li>
                  <span>Palmers Colleger</span>
                  <br />A level Mathematics, Economics, Sports and Exercise
                  Science
                </li>
                <li>
                  <span>Complete Web Developer 2023 Bootcamp</span>
                </li>
                <li>
                  <span>React Complete Guide</span>
                </li>
                <li>
                  <span>Complete JavaScript Bootcamp</span>
                </li>
                <li>
                  <span>Freecode Camp, Web developer training </span>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
        >
          <Technology />
        </motion.div>
      </div>
    </motion.main>
  );
};

export default About;
