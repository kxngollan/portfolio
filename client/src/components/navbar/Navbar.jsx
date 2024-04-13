import { useState, useEffect } from "react";
import MobileNav from "./MobileNav";
import BigNav from "./BigNav";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const name = "Ollan Muza";
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Projects", path: "/projects" },
    { title: "Contact", path: "/contact" },
  ];
  const socialLinks = [
    {
      href: "https://github.com/kxngollan",
      target: "_blank",
      rel: "noreferrer",
      icon: <FaGithub className="nav-icon" />,
    },
    {
      href: "https://www.linkedin.com/in/ollan-muza-3bb54326b/",
      target: "_blank",
      rel: "noreferrer",
      icon: <FaLinkedin className="nav-icon" />,
    },
    {
      href: "mailto:ammmuza@example.com",
      icon: <HiOutlineMail className="nav-icon" />,
    },
  ];

  if (width > 1000) {
    return <BigNav name={name} socialLinks={socialLinks} navLinks={navLinks} />;
  } else {
    return (
      <MobileNav name={name} socialLinks={socialLinks} navLinks={navLinks} />
    );
  }
};

export default Navbar;
