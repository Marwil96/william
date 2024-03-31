import React from "react";
import SectionLabel from "./SectionLabel";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const ProjectCard = ({
  title,
  desc,
  href,
  external,
}: {
  title: string;
  desc: string;
  href?: string;
  external?: boolean;
}) => {
  return !external ? (
    <Link
      href={href}
      passHref
      className="flex justify-between items-center bg-black rounded-xl p-2 cursor-pointer transition-transform duration-350 ease-in-out transform hover:scale-105 hover:outline-white mb-3 last:mb-0"
    >
      <div className="flex flex-col items-start max-w-70">
        <h3 className="text-base font-inter font-medium text-gray-200 mb-1.5">
          {title}
        </h3>
        <span className="text-base font-sans font-light leading-10 text-gray-400">
          {desc}
        </span>
      </div>
      <ArrowRightIcon className="hidden md:block" />
    </Link>
  ) : (
    <Link href={href} passHref target="__blank" className="mb-3 last:mb-0">
      <div className="flex justify-between items-center bg-black rounded-xl p-2 cursor-pointer transition-transform duration-350 ease-in-out transform hover:scale-105 hover:outline-white mb-3 last:mb-0">
        <div className="flex flex-col items-start max-w-70">
          <h3 className="text-base font-inter font-medium text-gray-200 mb-1.5">
            {title}
          </h3>
          <span className="text-base font-sans font-light leading-10 text-gray-400">
            {desc}
          </span>
        </div>
        <ArrowRightIcon className="hidden md:block" />
      </div>
    </Link>
  );
};

export default ProjectCard;
