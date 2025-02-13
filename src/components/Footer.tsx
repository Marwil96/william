import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" py-6 lg:py-10 px-6 bg-black w-[calc(100vw-18px)] flex justify-center align-bottom">
      <div className="flex justify-between items-start max-w-4xl w-full flex-col md:flex-row md:items-center">
        <div className="flex flex-col md:flex-row">
          <Link
            href="/"
            passHref
            className="text-sm lg:text-base font-serif italic mb-1 text-white hover:opacity-50 md:mr-4 md:mb-0"
          >
            Home
          </Link>
          <Link
            href="/writings"
            passHref
            className="text-sm lg:text-base font-serif italic mb-1 text-white hover:opacity-50 md:mr-4 md:mb-0"
          >
            Writings
          </Link>
          <Link
            href="/projects"
            passHref
            className="text-sm lg:text-base font-serif italic mb-1 text-white hover:opacity-50 md:mr-4 md:mb-0"
          >
            Projects & Products
          </Link>
          <Link
            href="/experiments"
            passHref
            className="text-sm lg:text-base font-serif italic mb-1 text-white hover:opacity-50 md:mr-4 md:mb-0"
          >
            Experiments
          </Link>
          <Link
            href="/contact"
            passHref
            className="text-sm lg:text-base font-serif italic mb-1 text-white hover:opacity-50 md:mr-4 md:mb-0"
          >
            Contact
          </Link>
        </div>
        <a
          target="__blank"
          href="mailto:marwil1996@gmail.com"
          className="text-sm lg:text-base font-serif italic mb-1 text-white hover:opacity-50 md:mr-4 md:mb-0"
        >
          marwil1996@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Footer;
