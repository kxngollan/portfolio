"use client";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { IoLogoFigma } from "react-icons/io5";
import { FaGlobeAfrica } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import "./Projects.css";
import chess from "./assets/chess.png";
import catchem from "./assets/catchem.png";
import color from "./assets/coloralong.png";
import cv from "./assets/cvmaker.png";
import drum from "./assets/drum.png";
import etch from "./assets/etchsketch.png";
import forum from "./assets/forum.png";
import fstore from "./assets/fstore.png";
import portfolio from "./assets/portfolio.png";

const Projects = () => {
  const wrapperRef = useRef(null);
  const [isDragged, setIsDragged] = useState(false);

  const vue = [
    {
      name: "Chess",
      description:
        "A chess game allow users to play and fetch games using Chess.com API",
      link: "https://chess-weld-rho.vercel.app/analysis",
      github: "https://github.com/kxngollan/chess",
      photo: chess,
    },
    {
      name: "Forum",
      description:
        "Message forum board app for users to login and drop a messgae in for others to see and do with as they please",
      link: "https://nuxtapp-sooty.vercel.app/",
      github: "https://github.com/kxngollan/nuxtapp",
      photo: forum,
    },
  ];

  const react = [
    {
      name: "Portfolio",
      description:
        "This is my personal portfolio that I created to showcase all of my abilities as a full stack developer. Using a plethora of different technologies to create. I want to be able to have a place where people can come and see all of my work without being overwhelmed nor confused.",
      link: "https://wwww.ollanmuza.com",
      github: "https://github.com/kxngollan/portfolio",
      figma:
        "https://www.figma.com/file/TSiGHDAfHnW1EZGlD1lR5W/portfolio?type=design&node-id=0-1&mode=design&t=r5DczCSMr1MmdJSy-0",
      photo: portfolio,
    },
    {
      name: "FStore",
      description:
        "A store to browse through various, object and be able to browse different pages as well as add them to your cart",
      link: "https://fake-store-red.vercel.app/",
      github: "https://github.com/kxngollan/fake-store",
      photo: fstore,
    },
    {
      name: "Catch'em ",
      description:
        "This is a Pokemon game that I created as a memory game from The Odin project. Why Pokemon? Pokemon has been one of my favourite games to play since I was 8 years so I wanted to create some which would be fun and inquisitive. I use 'pokeapi.co' to source the images",
      link: "https://chic-gecko-a211b1.netlify.app/",
      github: "https://github.com/kxngollan/Catch-em-all",
      figma: "https://github.com/kxngollan/Catch-em-all",
      photo: catchem,
    },
    {
      name: "CV",
      description:
        "This is a Cv maker created using Vite ReactJs. I used Vite because the load time is considerable faster than regular react. This uses the useState functionality in react to keep store of the inputs and",
      link: "https://teal-biscuit-78824f.netlify.app/",
      github: "https://github.com/kxngollan/cv-maker",
      figma:
        "https://www.figma.com/file/CBAXUlYq2xCAT6k2EKXnXw/portfolio?type=design&mode=design&t=oTV3yepu6BMZqjrk-1",
      photo: cv,
    },
  ];

  const other = [
    {
      name: "color",
      description:
        "This is a kids memory game of remember the sequence. The whole point of this game is to the previous colors and see if the player can reenact the complete sequence with each level only having one color added for additional difficult.",
      link: "https://kxngollan.github.io/Color-Along/",
      github: "https://github.com/kxngollan/color-along",
      figma:
        "https://www.figma.com/file/vMFHsmHFFNfzEfshDtwNhv/Color-Along?type=design&node-id=0%3A1&mode=design&t=xbZGHmaiV5oHn0dr-1",
      photo: color,
    },
    {
      name: "Sketch",
      description:
        "This is an Etch A Sketch board project that I built as a kid's fun game. I found this project idea on the Odin project and I loved it so much because it reminded me of being a kid travelling and being given one of these to doodle on. It was a lot of fun to make, especially because of all the elaborate creations I can doodle.",
      link: "https://kxngollan.github.io/etch-a-sketch-page/",
      github: "https://github.com/kxngollan/etch-a-sketch-page",
      figma:
        "https://www.figma.com/file/OBpI2xulWl3y4ktwVVNpFc/Etch-a-sketch?type=design&node-id=0%3A1&mode=design&t=oTV3yepu6BMZqjrk-1",
      photo: etch,
    },
    {
      name: "KeyDrum",
      description:
        "This is a drum app which allows for users to make cool and interesting beats. It is very simple and fun to play with. I I made this to showcase my abilities with vanilla Javascript, html and css.",
      link: "https://kxngollan.github.io/My-Drum/",
      github: "https://github.com/kxngollan/My-Drum",
      photo: drum,
    },
  ];

  const display = [
    {
      title: "Vue/Nuxt",
      id: "vue",
      content: vue,
    },
    { title: "React/Next", id: "react", content: react },
    {
      title: "Other",
      id: "other",
      content: other,
    },
  ];

  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = anchor.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", () => {});
      });
    };
  }, []);

  useEffect(() => {
    const slider = wrapperRef.current;

    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const preventClick = (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };

    const mouseDownHandler = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const mouseUpHandler = (e) => {
      isDown = false;
      if (isDragged) {
        const projects = slider.querySelectorAll(".project");
        projects.forEach((project) =>
          project.addEventListener("click", preventClick)
        );
      } else {
        const projects = slider.querySelectorAll(".project");
        projects.forEach((project) =>
          project.removeEventListener("click", preventClick)
        );
      }
      slider.classList.remove("active");
      setIsDragged(false);
    };

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      setIsDragged(true);
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      slider.scrollLeft = scrollLeft - walk;
    };

    // Attach event listeners
    slider.addEventListener("mousedown", mouseDownHandler);
    slider.addEventListener("mouseleave", mouseLeaveHandler);
    slider.addEventListener("mouseup", mouseUpHandler);
    slider.addEventListener("mousemove", mouseMoveHandler);

    // Cleanup event listeners on unmount
    return () => {
      slider.removeEventListener("mousedown", mouseDownHandler);
      slider.removeEventListener("mouseleave", mouseLeaveHandler);
      slider.removeEventListener("mouseup", mouseUpHandler);
      slider.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [isDragged]);

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
    <motion.main initial="initial" animate="animate" variants={parentVariants}>
      <motion.section
        id="portfolio"
        className="portfolio"
        initial="initial"
        animate="animate"
        variants={childVariants}
      >
        <div className="wrap">
          <header className="section-heading">
            <h4>
              <b>My Work</b>
            </h4>
            <nav className="portfolio-nav" aria-labelledby="portfolio">
              <p className="portfolio-intro">
                The projects I create illustrate the ideas and skills I am
                developing over the course of my career as a developer.
              </p>
              <ul id="web_hidden">
                <b>Frameworks:</b>
                <li>
                  <Link href="#vue">Nuxt/Vue</Link>
                </li>
                <li>
                  <Link href="#react">React/Next</Link>
                </li>
                <li>
                  <Link href="#other">Other</Link>
                </li>
              </ul>
            </nav>
          </header>

          <section className="portfolio-container">
            <ol>
              {display.map((col, i) => (
                <li id={col.id} className="portfolio-content" key={i}>
                  <div>
                    <span>{i + 1}</span>
                    <h3>{col.title}</h3>
                    <div className="portfolio-index">
                      <p className="portfolio__index-hide">
                        * Scroll horizontally / drag right to view projects
                      </p>
                    </div>
                  </div>
                  <ul className="wrapper" ref={wrapperRef}>
                    {col.content.map((cont, j) => (
                      <li className="project" key={j}>
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={cont.link ? cont.link : ""}
                        >
                          <Image
                            src={cont.photo}
                            alt="image of Music Material"
                          />
                          <p>
                            <b>{cont.name}</b>
                          </p>
                          <p>{cont.description}</p>
                        </Link>
                        <ul className="project-tools"></ul>
                        <div
                          className="links"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {cont.link ? (
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={cont.link}
                              className="flex justify-center flex-col items-center hover:text-white"
                            >
                              <FaGlobeAfrica /> Demo
                            </Link>
                          ) : (
                            ""
                          )}
                          {cont.github ? (
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={cont.github}
                              className="flex justify-center flex-col items-center hover:text-white"
                            >
                              {" "}
                              <FaGithub /> Github
                            </Link>
                          ) : (
                            ""
                          )}
                          {cont.figma ? (
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={cont.figma}
                              className="flex justify-center flex-col items-center hover:text-white"
                            >
                              {" "}
                              <IoLogoFigma /> Figma
                            </Link>
                          ) : (
                            ""
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </motion.section>
    </motion.main>
  );
};

export default Projects;
