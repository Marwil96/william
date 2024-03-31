import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";

const Layout = ({
  children,
  project,
  title,
  desc,
}: {
  children: any;
  project?: boolean;
  title: string;
  desc: string;
}) => {
  return (
    <>
      <NextSeo title={title} description={desc} />
      <section className="w-full flex flex-col items-center overflow-hidden px-4 md:px-40">
        <motion.div
          className="w-full pb-16 min-h-screen md:pb-80"
          layout
          initial={{ width: "61.5rem" }}
          animate={{ width: !project ? "61.5rem" : "100%" }}
          exit={{ width: "61.5rem" }}
          transition={{ duration: project ? 1.35 : 0.2 }}
        >
          <Navbar />
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: project ? 0.5 : 0.2 }}
          >
            {children}
          </motion.div>
        </motion.div>
        <Footer />
      </section>
    </>
  );
};

export default Layout;
