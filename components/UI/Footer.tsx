import Link from "next/link";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <section>
          <h2>navigation.</h2>
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/#experience"}>Experience</Link>
            </li>{" "}
            <li>
              <Link href={"/#technical-stack"}>Tech Stcks</Link>
            </li>
            <li>
              <Link href={"/#projects"}>Projects</Link>
            </li>
            <li>
              <Link href={"/#contact"}>Contact</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>say hello.</h2>
          <ul>
            <li>
              <Link href={"/#contact"}>Contact form</Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:ollanmuza@gmail.com"
              >
                Send an email
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>let{`'`}s connect.</h2>
          <ul>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/kxngollan"
              >
                Github
              </Link>
            </li>

            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/ollan-muza-3bb54326b/"
              >
                Linkedin
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <p>
        Site developed and designed by{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/kxngollan"
        >
          {" "}
          Ollan Muza
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
