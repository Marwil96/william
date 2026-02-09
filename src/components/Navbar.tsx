import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

const Navbar = ({ isProject }) => {
  return (
    <motion.div
      className="flex justify-between items-center pt-5 max-w-[100%]"
    >
      <div className="flex flex-col md:flex-row">
        <Link
          href="/"
          passHref
          className="text-sm lg:text-base font-title font-light italic mb-1 cursor-pointer text-white lg:hover:text-[#ff5800] md:mr-4 md:mb-0"
        >
          Home
        </Link>
        <Link
          href="/experiments"
          passHref
          className="text-sm lg:text-base font-title font-light italic mb-1 cursor-pointer text-white lg:hover:text-[#ff5800] md:mr-4 md:mb-0"
        >
          Experiments
        </Link>

        <Link
          href="/contact"
          passHref
          className="text-sm lg:text-base font-title font-light italic mb-1 cursor-pointer text-white lg:hover:text-[#ff5800] md:mr-4 md:mb-0"
        >
          Contact
        </Link>
      </div>
      <a
        href="mailto:william.c.o.martinsson@gmail.com"
        className="text-sm lg:text-base font-title font-light italic mb-1 cursor-pointer text-white lg:hover:text-[#ff5800] md:mr-4 md:mb-0"
      >
        Send me an email
      </a>
    </motion.div>
  );
};

export default Navbar;
