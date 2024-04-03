import type { NextPage } from "next";
import Layout from "../components/Layout";
import LinkItem from "src/components/LinkItem";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProjectComponent = ({
  title,
  subtitle,
  metadata,
  children,
  heroImage,
  linkToWebsite,
}: {
  title: string;
  subtitle: string;
  children: any;
  metadata: any;
  heroImage: any;
  linkToWebsite?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 1,
    margin: "0px -50px 0px 0px",
  });

  return (
    <div className="flex flex-col relative mt-0 md:mt-8">
      <motion.h1
        className="text-6xl font-title font-normal mb-3 mt-6 md:mt-40 md:text-8xl md:mb-10"
        initial={{ opacity: 0, y: 75 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0, y: 75 }}
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
      >
        {title}
      </motion.h1>
      <div className="flex flex-col mb-4 md:mb-7 md:flex-row md:max-w-4/5">
        {metadata.map(
          ({ label, value }: { label: string; value: string }, index: any) => (
            <motion.div
              className="flex flex-col mb-6 md:mr-8 md:mb-0 last:mr-0 gap-2"
              key={index}
            >
              <motion.span
                className="font-title text-base text-gray-600 md:text-base !leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.25 + index / 2, duration: 0.25 }}
              >
                {label}
              </motion.span>
              <motion.span
                className="font-text text-base md:text-lg !leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index / 2, duration: 0.25 }}
              >
                {value}
              </motion.span>
            </motion.div>
          )
        )}
      </div>
      <div className="relative w-full mb-4 rounded-lg md:mb-12">
        {linkToWebsite && (
          <motion.a
            initial={{ scale: 0 }}
            className="w-20 h-20 flex justify-center items-center font-text font-medium text-sm text-center absolute bg-white text-black rounded-full z-10 right-2 top-[-32px] cursor-pointer hover:bg-gray-400 md:w-40 md:h-40 md:right-[30px] md:top-[-80px] md:text-lg"
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 1 }}
            target="__blank"
            href={linkToWebsite}
          >
            Visit Website
          </motion.a>
        )}

        <div className="relative w-full aspect-[16/8] overflow-hidden rounded-lg md:rounded-xl">
          <Image
            src={heroImage}
            alt={`${title} hero image`}
            className="aspect-[16/8] relative w-full h-full overflow-hidden rounded-lg md:rounded-xl object-cover"
            layout="intrinsic"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
          />
        </div>
      </div>
      <div className="flex flex-col items-center text-left w-full max-w-[79.2rem] align-center justify-center self-center place-self-center [&>*]:w-full [&>*]:text-left prose-p:mb-10 prose-p:font-system prose-p:text-base lg:prose-p:text-xl prose-headings:mb-2 prose-headings:font-title prose-headings:text-xs lg:prose-headings:text-base prose-blockquote:text-xl prose-blockquote:font-title prose-blockquote:mb-4 prose-blockquote:italic prose-blockquote:text-white prose-blockquote:text-left prose-blockquote:w-full">
        <motion.h3
          ref={ref}
          className="!text-2xl font-title font-normal italic max-w-[79.2rem] text-gray-200 !mb-6 md:text-5xl md:mb-20 !leading-[130%]"
          // animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
        >
          {subtitle}
        </motion.h3>
        {children}
      </div>
    </div>
  );
};

export default ProjectComponent;
