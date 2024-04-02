import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from "next-seo";

const Layout = ({
  children,
  project,
  title,
  desc,
  framerKey,
}: {
  children: any;
  project?: boolean;
  title: string;
  desc: string;
  framerKey: string;
}) => {
  return (
    <>
      <NextSeo title={title} description={desc} />
      <section className="w-full flex flex-col items-center overflow-hidden px-6 md:px-40">
        <AnimatePresence mode="wait">
          <motion.div
            className="w-full pb-8 min-h-screen md:pb-80 max-w-[100%]"
            key={framerKey}
            initial={{ width: "615px" }}
            animate={{ width: !project ? "615px" : "100%" }}
            exit={{ width: "615px" }}
            transition={{
              duration: project ? 0.35 : 0.2,
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            <Navbar isProject={project} />
            <AnimatePresence mode="wait">
              <motion.div
                layout
                key={framerKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: project ? 0.5 : 0.4 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
        <Footer />
      </section>
    </>
  );
};

export default Layout;
