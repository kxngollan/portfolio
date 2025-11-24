import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { ReactElement } from "react";

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

const MobileNav = ({ show, change, menuItems, socialLinks }:{show:boolean, change:() => void, menuItems:MenuItem[], socialLinks:socials[]}) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <>
      <motion.div
      initial="closed"
        animate={show ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.3 }}
        className="
    fixed top-0 left-0
    h-screen w-[200px]
    z-1000
    flex flex-col
    pt-[20vh] pl-5
    bg-black text-[#fdffe0]
    md:hidden
  "
      >
        <button
          className="
      absolute top-5 left-5
      border-0
      bg-transparent
      text-[#fdffe0]
    "
          onClick={() => change()}
        >
          <FaTimes className="text-2xl" />
        </button>

        <ul
          className="
      flex flex-col justify-between
      max-h-[200px] h-[40vh]
      space-y-2
    "
        >
          {menuItems.map((link: MenuItem) => (
            <li key={link.href} className="list-none">
              <Link href={link.href} className="text-xl">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex gap-4">
          {socialLinks.map((link: socials) => (
            <li key={link.href} className="list-none">
              <a
                href={link.href}
                target={link.target}
                rel={link.rel}
                className="text-xl"
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      {show ? (
        <div
          className="
      fixed inset-0
      h-screen w-full
      bg-black/50
      z-100
    "
          onClick={() => change()}
        />
      ) : null}
    </>
  );
};

export default MobileNav;
