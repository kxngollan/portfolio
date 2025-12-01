"use client";
import { FC, useEffect, useState, ReactElement } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import MobileNav from "./MobileNav";

type MenuItem = {
  text: string;
  href: string;
};

type socials = {
  href: string;
  target?: string;
  rel?: string;
  icon: ReactElement;
};

const Header: FC = () => {
  const [opacity, setOpacity] = useState<number>(1);
  const [show, setshow] = useState<boolean>(false);
  const path = usePathname();



  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newOpacity = scrollTop > 50 ? 0.5 : 1;
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "";
      document.body.style.overflow = "";
    }
  }, [show]);

  const menuItems: MenuItem[] = [
    { text: "home", href: path === "/" ? "#hero" : "/#hero" },
    {
      text: "Tech Stack",
      href: path === "/" ? "#technical-stack" : "/#technical-stack",
    },
    { text: "Experience", href: path === "/" ? "#experience" : "/#experience" },
    { text: "projects", href: path === "/" ? "#projects" : "/#projects" },
    { text: "contact", href: path === "/" ? "#contact" : "/#contact" },
  ];

  const socialLinks: socials[] = [
    {
      href: "https://github.com/kxngollan",
      target: "_blank",
      rel: "noreferrer",
      icon: <FaGithub className="nav-icon" />,
    },
    {
      href: "https://www.linkedin.com/in/ollan-m/",
      target: "_blank",
      rel: "noreferrer",
      icon: <FaLinkedin className="nav-icon" />,
    },
    {
      href: "mailto:ollanmuza@example.com",
      icon: <HiOutlineMail className="nav-icon" />,
    },
  ];

  return (
    <>
      <nav
        className={`"
        fixed
        top-8
        left-1/2
        -translate-x-1/2
        flex
        items-center
        rounded-full
        border
        border-white/10
        h-12
        md:h-16
        px-4
        md:px-6
        backdrop-blur-md
        hover:opacity-100
        bg-[rgb(227,214,195)]
        dark:bg-[rgb(30,28,25)]
        " ${show ? "z-20" : "z-100"}`}
        style={{
          opacity,
        }}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => {
          const sc = typeof window !== "undefined" ? window.scrollY : 0;
          setOpacity(sc > 50 ? 0.5 : 1);
        }}
      >
        <div
          className=" md:flex
        hidden  gap-4 mr-4 justify-center"
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="
          px-3
          py-1
          text-sm
          cursor-pointer
          transition
          duration-300
          border-b-2
          border-transparent
          hover:border-[#ffa351]
          whitespace-nowrap
          capitalize
          "
            >
              {item.text}
            </Link>
          ))}
        </div>
        <div
          className="flex justify-center items-center gap-4 md:hidden"
          onClick={() => setshow(true)}
        >
          <TiThMenu />
          Ollan M.
        </div>
      </nav>
      <MobileNav
        show={show}
        change={() => setshow(false)}
        menuItems={menuItems}
        socialLinks={socialLinks}
      />
    </>
  );
};

export default Header;
