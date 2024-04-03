import React from "react";
import Link from "next/link";

const LinkItem = ({
  title,
  desc,
  action,
  leftText,
  key,
  subtitle,
  href,
  external,
}: {
  title: string;
  href: string;
  desc?: string;
  action?: string;
  subtitle?: string;
  leftText?: string;
  key: any;
  external?: boolean;
}) => {
  return external ? (
    <a
      href={href}
      target="__blank"
      className="flex flex-col group py-4 cursor-pointer transition-transform duration-350 ease-in-out transform relative justify-center border-b border-dashed border-gray-400 last:mb-0 hover:text-white"
    >
      <h3 className="text-base lg:text-lg font-title group-hover:underline font-medium italic text-gray-200">
        {title}
      </h3>
      {desc && (
        <span className="text-sm font-text font-medium group-hover:underline mb-3 text-gray-500 text-balance">
          {desc}
        </span>
      )}
      {action && (
        <span className="text-sm font-text font-medium underline text-gray-200">
          {action}
        </span>
      )}
      {leftText && (
        <span className="font-title text-sm absolute underline-offset-2 group-hover:underline transition-transform ease-in-out duration-200 ml-[-85px] rotate-90">
          {leftText}
        </span>
      )}
    </a>
  ) : (
    <Link
      href={href}
      passHref
      className="flex flex-col group py-4 cursor-pointer transition-transform duration-350 ease-in-out transform relative justify-center border-b border-dashed border-gray-400 last:mb-0 hover:text-white"
    >
      <h3 className="text-base lg:text-lg font-title group-hover:underline font-medium italic text-gray-200">
        {title}
      </h3>
      <span className="text-sm font-text font-medium group-hover:underline mb-3 text-gray-500 text-balance">
        {desc}
      </span>
      <span className="text-sm font-text font-medium underline text-gray-200">
        {action}
      </span>
      {leftText && (
        <span className="font-title text-sm absolute underline-offset-2 group-hover:underline ml-[-96px] rotate-90">
          {leftText}
        </span>
      )}
    </Link>
  );
};

export default LinkItem;
