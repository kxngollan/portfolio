import "./MobileNav.css";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      <Link to="/" className="title">
        <h1>{name}</h1>
      </Link>
      <motion.div
        animate={show ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 1 }}
        className="side-nav"
      >
        <button className="side-nav-toggle">
          <FaTimes onClick={() => setShow(!show)} className="toggle-icon" />
        </button>
        <ul className="side-nav-links">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="side-nav-link">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <ul className="side-nav-socials">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} target={link.target} rel={link.rel}>
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      {show ? (
        <div className="overlay" onClick={() => setShow(!show)}></div>
      ) : null}
    </nav>
  );
};

MobileNav.propTypes = {
  navLinks: PropTypes.array,
  socialLinks: PropTypes.array,
  name: PropTypes.string,
};

export default MobileNav;
