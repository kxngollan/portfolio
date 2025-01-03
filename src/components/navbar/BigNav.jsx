import "./BigNav.css";
import PropTypes from "prop-types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BigNav = ({ name, navLinks, socialLinks }) => {
  const pathname = usePathname();

  return (
    <nav className="bigNav relative flex justify-between items-center p-0 top-0 right-0 text-3xl ">
      <Link href={"/"} className="">
        <h1 className=" font-bold important text-5xl">{name}</h1>
      </Link>
      <ul className="navLinks flex justify-between gap-4">
        {navLinks.map((link) => (
          <li
            key={link.path}
            className={` ${pathname === link.path ? "text-white" : "nav-item"}`}
          >
            <Link href={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <ul className="socialLinks flex justify-between gap-4">
        {socialLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} target={link.target} rel={link.rel}>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      <p onClick={() => console.log(pathname)}></p>
    </nav>
  );
};

BigNav.propTypes = {
  name: PropTypes.string,
  navLinks: PropTypes.array,
  socialLinks: PropTypes.array,
};

export default BigNav;
