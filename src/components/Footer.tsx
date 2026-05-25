import React from "react";
import Link from "next/link";
import { VisitorCount } from "src/components/VisitorCount";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/writings", label: "Writings" },
  { href: "/projects", label: "Projects" },
  { href: "/experiments", label: "Experiments" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/william-martinsson-a24a3b111/",
    label: "LinkedIn",
  },
  { href: "https://williammartinsson.medium.com/", label: "Medium" },
  { href: "https://github.com/Marwil96", label: "Github" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-dashed border-gray-400">
      <div className="max-w-[655px] mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-12">
          {/* Navigation */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-inter uppercase tracking-[0.2em] text-gray-500 mb-2">
              Navigate
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm lg:text-base font-title italic text-gray-300 hover:text-[#ff5800] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-inter uppercase tracking-[0.2em] text-gray-500 mb-2">
              Elsewhere
            </span>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm lg:text-base font-title italic text-gray-300 hover:text-[#ff5800] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-inter uppercase tracking-[0.2em] text-gray-500 mb-2">
              Get in touch
            </span>
            <a
              href="mailto:william.c.o.martinsson@gmail.com"
              className="text-sm lg:text-base font-title italic text-gray-300 hover:text-[#ff5800] transition-colors duration-200"
            >
              william.c.o.martinsson@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 md:mt-14 pt-4 border-t border-dashed border-gray-400 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <span className="text-xs font-system text-gray-500">
            William Martinsson — Design Engineer
          </span>
          <div className="flex items-center gap-3 text-xs font-system text-gray-600">
            <VisitorCount />
            <span>Stockholm, Sweden</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
