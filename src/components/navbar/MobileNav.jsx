"use client";

import "./MobileNav.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const MobileNav = ({ navLinks, name, socialLinks }) => {
  const [show, setShow] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <nav className="mobile-nav">
      <button className="side-nav-toggle" onClick={() => setShow(!show)}>
        <FaBars className="toggle-icon" />
      </button>
      <Link href="/" className="title">
        <h1>{name}</h1>
      </Link>
      <motion.div
        animate={show ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.3 }}
        className="side-nav"
      >
        <button className="side-nav-toggle" onClick={() => setShow(!show)}>
          <FaTimes className="toggle-icon" />
        </button>
        <ul className="side-nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path} className="side-nav-link">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="side-nav-socials">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} target={link.target} rel={link.rel}>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
      {show && <div className="overlay" onClick={() => setShow(false)} />}
    </nav>
  );
};

MobileNav.propTypes = {
  navLinks: PropTypes.array.isRequired,
  socialLinks: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default MobileNav;
