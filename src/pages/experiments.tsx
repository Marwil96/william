import { NextPage } from "next";
import Layout from "src/components/Layout";
import { motion } from "framer-motion";
import { CartItems } from "src/components/CartSummary";
import { MockedCartProvider } from "src/components/MockCartProvider";
import { useState } from "react";

const Experiments: NextPage = () => {
  const [openExperiement, setOpenExperiment] = useState<false | string>(
    undefined
  );
  return (
    <Layout
      title="Experiments - William Martinsson - Designer & Developer"
      desc="Crafting digital products. Building performant software and web experiences. Dreaming about design systems, new ways of creating components, and JavaScript. Currently designing and developing the new wave of internet art at Artscape. Helping businesses succeed under the name Oh, Hi."
      framerKey="experiment"
      project={true}
      className="w-full px-6 md:px-40"
    >
      <div className="flex flex-col relative mt-0 md:mt-8">
        <div className="flex justify-between flex-col gap-2 lg:gap-0 lg:flex-row align-bottom mb-3 mt-6 md:mb-10 md:mt-10">
          <motion.h1
            className="text-4xl font-title sticky top-0 left-0 font-thin  text-[#F7F7F7]  md:text-8xl"
            initial={{ opacity: 0, y: 75 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: 75 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              delay: 0.1,
            }}
          >
            UI Experiments
          </motion.h1>
          <span className="text-sm font-system lg:text-right pb-[8px] text-gray-400 lg:text-white flex place-content-end items-end  lg:max-w-[200px]">
            This is a playground for me to experiment with different animations,
            interactions, and design patterns.
          </span>
        </div>

        <div className="border border-dashed border-gray-400 flex flex-col lg:flex-row w-full">
          <div
            onClick={() => setOpenExperiment("minicart")}
            className="h-full flex flex-col lg:w-[64px] lg:border-0 border-b w-full border-dashed border-gray-400 lg:sticky top-0 left-0 right-0 cursor-pointer"
          >
            <span className="text-base  lg:text-xl p-4 lg:p-0 lg:mt-10 font-title lg:mb-1 lg:rotate-90">
              Minicart
            </span>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-col lg:flex-row border-b border-dashed border-gray-400 justify-between align-top w-full">
              <div className="flex justify-start flex-col group py-4 transition-transform duration-350 ease-in-out transform relative border-b lg:border-x lg:border-y-0 p-4 align-top h-full lg:max-w-[250px] border-dashed border-gray-400 last:mb-0">
                <h3 className="text-base lg:text-lg font-title  font-medium italic text-gray-200 mb-1">
                  Iteration 1
                </h3>
                <span className="text-sm font-inter text-gray-400 leading-normal">
                  A ordinary cart item you can see on multiple ecom websites.
                  <ul style={{ listStyleType: "circle" }} className="pl-4 pt-2">
                    <li className="decoration-dotted">Minimal Interactions.</li>
                    <li className="decoration-dotted">Feels Slow.</li>
                    <li className="decoration-dotted">Boring.</li>
                  </ul>
                </span>
              </div>

              <div className="flex p-4">
                <MockedCartProvider>
                  <CartItems step={0} />
                </MockedCartProvider>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row border-b border-dashed border-gray-400 justify-between align-top w-full">
              <div className="flex justify-start flex-col group py-4 transition-transform duration-350 ease-in-out transform relative border-b lg:border-x lg:border-y-0 p-4 align-top h-full lg:max-w-[250px] border-dashed border-gray-400 last:mb-0">
                <h3 className="text-base lg:text-lg font-title  font-medium italic text-gray-200 mb-1">
                  Iteration 2 - With Animation
                </h3>
                <span className="text-sm font-inter text-gray-400 leading-normal">
                  Whats done:
                  <ul style={{ listStyleType: "circle" }} className="pl-4 py-2">
                    <li className="decoration-dotted">
                      Cartitem glides out when removed.
                    </li>
                    <li className="decoration-dotted">
                      Loading state indicators to provide real-time user
                      feedback.
                    </li>
                  </ul>
                  Better but the response time remains sluggish, detracting from
                  the overall pleasantness of the user experience.
                </span>
              </div>

              <div className="flex p-4">
                <MockedCartProvider>
                  <CartItems step={1} />
                </MockedCartProvider>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row border-b border-dashed border-gray-400 justify-between align-top w-full">
              <div className="flex justify-start flex-col group py-4 transition-transform duration-350 ease-in-out transform relative border-b lg:border-x lg:border-y-0 p-4 align-top h-full lg:max-w-[250px] border-dashed border-gray-400 last:mb-0">
                <h3 className="text-base lg:text-lg font-title  font-medium italic text-gray-200 mb-1">
                  Iteration 3 - Optimistic UI
                </h3>
                <span className="text-sm font-inter text-gray-400 leading-normal">
                  Whats done:
                  <ul style={{ listStyleType: "circle" }} className="pl-4 py-2">
                    <li className="decoration-dotted">
                      Optimistic UI for item removal and quantity adjustments.
                    </li>
                  </ul>
                  Optimistic UI embodies the concept that the ideal loading
                  state is none at all. Rather than waiting for server
                  responses, it enables instant UI updates, making the user feel
                  in control. Its also a great way to improve the perceived
                  speed of your component.
                </span>
              </div>

              <div className="flex p-4">
                <MockedCartProvider>
                  <CartItems step={2} />
                </MockedCartProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Experiments;
