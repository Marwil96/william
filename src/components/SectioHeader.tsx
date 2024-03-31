import React from "react";
import SectionLabel from "./SectionLabel";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const SeactionHeader = ({ title, href }: { title: string; href: string }) => {
  return (
    <div className="flex justify-between items-center">
      <SectionLabel>{title}</SectionLabel>
      <Link
        href={href}
        passHref
        className="text-sm font-inter font-medium text-gray-400 mb-1 flex items-center border-b border-gray-400 pb-0.5 cursor-pointer hover:opacity-80"
      >
        See All <ArrowRightIcon className="ml-1.5 fill-current text-gray-400" />
      </Link>
    </div>
  );
};

export default SeactionHeader;
