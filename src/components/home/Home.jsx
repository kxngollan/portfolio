"use client";

import "./Home.css";
import { IoMdDownload } from "react-icons/io";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import CardSwiper from "./CardSwiper";
import Link from "next/link";

const Home = () => {
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
    <motion.div initial="initial" animate="animate" variants={parentVariants}>
      <main className="home-hero">
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="home-title"
        >
          <h1>Hi, I{`'`}m Ollan</h1>
          <h2> A full stack developer</h2>
          <motion.div
            initial="initial"
            animate="animate"
            variants={childVariants}
            className="list-buttons"
          >
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://github.com/kxngollan"
              className="home-links"
            >
              <button>
                <FaGithub className="home-icon" />
                Github
              </button>
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/ollan-muza-3bb54326b/"
              className="home-links"
            >
              <button>
                <FaLinkedin className="home-icon" />
                LinkedIn
              </button>
            </Link>
            <a
              href="/pdf/Portfolio-resume.pdf"
              download="/pdf/Portfolio-resume.pdf"
              className="home-links"
            >
              <button>
                <IoMdDownload className="home-icon" />
                Resume
              </button>
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="home-display"
        >
          <CardSwiper />
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Home;
