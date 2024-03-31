import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center pt-5">
      <div className="flex flex-col md:flex-row">
        <Link
          href="/"
          passHref
          className="text-base font-serif italic mb-1 cursor-pointer text-white hover:opacity-50 md:mr-4 md:mb-0"
        >
          Home
        </Link>
        <Link
          href="/writings"
          passHref
          className="text-base font-serif italic mb-1 cursor-pointer text-white hover:opacity-50 md:mr-4 md:mb-0"
        >
          Writings
        </Link>
        <Link
          href="/projects"
          passHref
          className="text-base font-serif italic mb-1 cursor-pointer text-white hover:opacity-50 md:mr-4 md:mb-0"
        >
          Projects & Products
        </Link>
        <Link
          href="/contact"
          passHref
          className="text-base font-serif italic mb-1 cursor-pointer text-white hover:opacity-50 md:mr-4 md:mb-0"
        >
          Contact
        </Link>
      </div>
      <a
        target="__blank"
        href="mailto:hi@williammartinsson.com"
        className="text-base font-serif italic mb-1 cursor-pointer text-white hover:opacity-50 md:mr-4 md:mb-0"
      >
        hi@williammartinsson.com
      </a>
    </div>
  );
};

export default Navbar;
