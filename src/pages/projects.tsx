import type { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import BlogComponent from "src/components/BlogComponent";
import { motion, AnimatePresence } from "motion/react";

export const posts = [
  {
    title: "Knodd",
    desc: "An entirely new part of the website with articles about different child diseases and a rewrite to server rendering.",
    action: "Go to case",
    leftText: "2019",
    href: "/projects/knodd",
  },
  {
    title: "Superchicane",
    desc: "Superchicane is a Formula One news platform made to tell stories with the help of data, everything from character portraits to the sport's technical aspects.",
    action: "Go to Project",
    leftText: "2021",
    href: "/projects/superchicane",
  },
  {
    title: "Radionight",
    desc: "A podcasting platform designed to generate hype around new episodes. Taking advantage of live streaming to imitate the movie premiere feel and producing a sense of community.",
    action: "Go to Project",
    leftText: "2022",
    href: "/projects/radionight",
  },
  {
    title: "Master Digital Design",
    desc: "We were tasked to create an alumni page for Amsterdam University of Applied Sciences design students.",
    action: "Go to Case",
    leftText: "2018",
    href: "/projects/master-digital-design",
  },
  {
    title: "Agenly",
    desc: "a website builder where you build your sites through having a dialogue with a decision tree(semi-AI).",
    action: "Go to Project",
    leftText: "2019",
    href: "/projects/agenly",
  },
  {
    title: "Matie",
    desc: "Matie is a recipe app, built around the feature to create cookbooks, which you can work on together with your friends and family.",
    action: "Go to Project",
    leftText: "2021",
    href: "/projects/matie",
  },
  {
    title: "KNVB Rinus",
    desc: "We were tasked to build the new version of KNVBs Rinus, a training platform for football teams. Where they can plan their exercises and get inspiration and advice from other football coaches.",
    action: "Go to Case",
    leftText: "2019",
    href: "/projects/knvb-rinus",
  },
];

const Projects: NextPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <Layout
      title="Projects - William Martinsson - Designer & Developer"
      desc="Crafting digital products. Building performant software and web experiences. Dreaming about design systems, new ways of creating components, and JavaScript. Currently designing and developing the new wave of internet art at Artscape. Helping businesses succeed under the name Oh, Hi."
      framerKey="projects"
      className="lg:w-[655px] mx-auto"
    >
      <div className="flex justify-end mb-6 font-inter">
        <div className="flex items-center gap-1 text-xs uppercase tracking-widest">
          <button
            onClick={() => setView("grid")}
            className={`transition-colors ${
              view === "grid"
                ? "text-[#F7F7F7]"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Grid
          </button>
          <span className="text-gray-500">/</span>
          <button
            onClick={() => setView("list")}
            className={`transition-colors ${
              view === "list"
                ? "text-[#F7F7F7]"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            List
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <BlogComponent
              title="Projects & Products"
              subtitle="A collection of my projects"
              posts={posts}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col">
              {posts.map((post, i) => (
                <Link key={post.href} href={post.href}>
                  <div className="flex items-center justify-between py-3 border-b border-dashed border-gray-400 font-system uppercase text-sm tracking-wide cursor-pointer transition-colors hover:bg-white/[0.03] group">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 tabular-nums">
                        {String(i + 1).padStart(3, "0")}
                      </span>
                      <span className="text-[#F7F7F7] group-hover:text-white transition-colors">
                        {post.title}
                      </span>
                    </div>
                    <span className="text-gray-500">{post.leftText}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Projects;
