import Link from "next/link";
import { motion } from "motion/react";

const ORANGE = "#ff5800";

type ArticleHeaderProps = {
  category: string;
  monthYear: string;
  title: string;
  standfirst: string;
  date: string;
  readTime: string;
  author?: string;
  backHref?: string;
  backLabel?: string;
};

export const ArticleHeader = ({
  category,
  monthYear,
  title,
  standfirst,
  date,
  readTime,
  author = "William Martinsson",
  backHref = "/writings",
  backLabel = "Writings",
}: ArticleHeaderProps) => (
  <header className="flex flex-col">
    <div className="mb-6">
      <Link
        href={backHref}
        className="text-[10px] font-inter uppercase tracking-[0.2em] text-gray-500 hover:text-gray-300 transition-colors no-underline"
      >
        ← {backLabel}
      </Link>
    </div>

    <div className="flex items-center gap-3 mb-5">
      <span aria-hidden className="block w-6 h-px" style={{ background: ORANGE }} />
      <span
        className="text-[10px] font-inter uppercase tracking-[0.25em]"
        style={{ color: ORANGE }}
      >
        {category}
      </span>
      <span className="text-[10px] font-inter uppercase tracking-[0.25em] text-gray-500">
        {monthYear}
      </span>
    </div>

    <motion.h1
      className="text-4xl md:text-5xl lg:text-[64px] font-title italic leading-[1.02] tracking-[-0.01em] mb-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 22, stiffness: 90 }}
    >
      {title}
    </motion.h1>

    <motion.p
      className="text-lg md:text-xl font-text text-gray-300 leading-[1.55] mb-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 22,
        stiffness: 90,
        delay: 0.05,
      }}
    >
      {standfirst}
    </motion.p>

    <div className="flex items-center gap-3 text-[10px] font-inter uppercase tracking-[0.2em] text-gray-500 pb-6 border-b border-dashed border-gray-700 mb-12">
      <span className="text-gray-300">{author}</span>
      <span aria-hidden className="w-1 h-1 rounded-full bg-gray-600" />
      <span>{date}</span>
      <span aria-hidden className="w-1 h-1 rounded-full bg-gray-600" />
      <span>{readTime}</span>
    </div>
  </header>
);
