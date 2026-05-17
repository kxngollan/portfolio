import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoReaderOutline } from "react-icons/io5";

const Connect: React.FC = () => {
  return (
    <div className="flex gap-4 items-center">
      <Link
        href="https://github.com/kxngollan"
        target="_blank"
        className="text-xl hover:text-[#ffa351] dark:hover:text-[#ffa351] transition-colors dark:text-white"
      >
        <FaGithub />
      </Link>
      <Link
        href="https://www.linkedin.com/in/ollan-m"
        target="_blank"
        className="text-xl hover:text-[#ffa351] dark:hover:text-[#ffa351] transition-colors dark:text-white"
      >
        <FaLinkedin />
      </Link>
      <Link
        href="/cv/resume.pdf"
        download={true}
        className="text-xl hover:text-[#ffa351] dark:hover:text-[#ffa351] transition-colors dark:text-white"
      >
        <IoReaderOutline />
      </Link>
    </div>
  );
};

export default Connect;
