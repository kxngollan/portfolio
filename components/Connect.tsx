import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoReaderOutline } from "react-icons/io5";

const Connect: React.FC = () => {
  return (
    <div>
      <Link href="https://github.com/kxngollan" target="_blank">
        <FaGithub />
      </Link>
      <Link href="https://www.linkedin.com/in/ollan-m" target="_blank">
        <FaLinkedin />
      </Link>
      <Link href="/cv/resume.pdf" download={true}>
        <IoReaderOutline />
      </Link>
    </div>
  );
};

export default Connect;
