import React from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWeatherSeason } from "./weather";
import { AnimatePresence, motion } from "motion/react";
import { NextSeo } from "next-seo";

const WeatherBackground = dynamic(
  () =>
    import("./weather/WeatherBackground").then((mod) => mod.WeatherBackground),
  { ssr: false }
);

const Layout = ({
  children,
  project,
  title,
  desc,
  framerKey,
  className = "w-full px-6 md:px-40",
}: {
  children: any;
  project?: boolean;
  title: string;
  desc: string;
  framerKey: string;
  className?: string;
}) => {
  const { bgEnabled } = useWeatherSeason();

  return (
    <>
      <NextSeo title={title} description={desc} />
      {bgEnabled && <WeatherBackground />}
      <section
        className={`${bgEnabled ? "relative z-10 " : ""}px-6 flex flex-col items-center mx-auto transition-all ${className}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            className="w-full pb-8 min-h-screen md:pb-20 max-w-[100%]"
            key={framerKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: project ? 0.35 : 0.2,
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            <Navbar isProject={project} />
                {children}
          </motion.div>
        </AnimatePresence>
      </section>
      <Footer />
    </>
  );
};

export default Layout;
