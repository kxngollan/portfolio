import "./BigNav.css";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const BigNav = ({ name, navLinks, socialLinks }) => {
  const location = useLocation();

  return (
    <nav className="bigNav">
      <Link to="/" className="navTitle">
        <h1>{name}</h1>
      </Link>
      <ul className="navLinks">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={`nav-item ${
              location.pathname === link.path ? "nav-item-active" : ""
            }`}
          >
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <ul className="socialLinks">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a href={link.href} target={link.target} rel={link.rel}>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

BigNav.propTypes = {
  name: PropTypes.string,
  navLinks: PropTypes.array,
  socialLinks: PropTypes.array,
};

export default BigNav;
