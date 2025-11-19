"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";

type MenuItem = {
  text: string;
  href: string;
};

const Header: FC = () => {
  const [opacity, setOpacity] = useState<number>(1);

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

  const menuItems: MenuItem[] = [
    { text: "home", href: "/" },
    { text: "Tech Stack", href: "#technical-stack" },
    { text: "Experience", href: "#experience" },
    { text: "projects", href: "#projects" },
    { text: "contact", href: "#contact" },
  ];

  return (
    <div
      className="
          fixed
          top-8
          left-1/2
          -translate-x-1/2
          z-1100
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
        "
      style={{
        opacity,
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => {
        const sc = typeof window !== "undefined" ? window.scrollY : 0;
        setOpacity(sc > 50 ? 0.5 : 1);
      }}
    >
      <div className="flex gap-4 mr-4">
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
    </div>
  );
};

export default Header;
