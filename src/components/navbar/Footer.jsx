import Link from "next/link";
import "./Footer.css";

const Footer2 = () => {
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
              <Link href={"/projects"}>Projects</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>

            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>say hello.</h2>
          <ul>
            <li>
              <Link target="_blank" rel="noopener noreferrer" href={"/contact"}>
                Contact form
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:ammmuza@gmail.com"
              >
                Send an email
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>let's connect.</h2>
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
            <li>
              <a href="/Portfolio-resume.pdf" download="Portfolio-resume.pdf">
                Resume
              </a>
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
        </Link>{" "}
      </p>
    </footer>
  );
};

export default Footer2;
