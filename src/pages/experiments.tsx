import { NextPage } from "next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "src/components/Layout";
import { CartItems } from "src/components/CartSummary";
import { MockedCartProvider } from "src/components/MockCartProvider";

interface Experiment {
  id: string;
  title: string;
  description: JSX.Element;
  step: number;
}

const experimentsData: Experiment[] = [
  {
    id: "iteration1",
    title: "Iteration 1: Classic Cart",
    description: (
      <>
        A traditional cart item experience found on many e-commerce platforms.
        <ul className="list-disc pl-4 mt-2">
          <li>Basic interactions</li>
          <li>No animations</li>
          <li>Static design</li>
        </ul>
      </>
    ),
    step: 0,
  },
  {
    id: "iteration2",
    title: "Iteration 2: With Animation",
    description: (
      <>
        Now with smooth transitions for cart item removals and loading
        indicators.
        <ul className="list-disc pl-4 mt-2">
          <li>Gliding exit animations</li>
          <li>Dynamic loading feedback</li>
        </ul>
      </>
    ),
    step: 1,
  },
  {
    id: "iteration3",
    title: "Iteration 3: Optimistic UI",
    description: (
      <>
        Embracing an optimistic UI approach, changes are reflected
        instantly—boosting perceived performance.
        <ul className="list-disc pl-4 mt-2">
          <li>Instant feedback on updates</li>
          <li>Minimized waiting states</li>
        </ul>
        This method makes users feel in control by eliminating the typical
        loading delays.
      </>
    ),
    step: 2,
  },
];

const Experiments: NextPage = () => {
  const [openExperiment, setOpenExperiment] = useState<string | null>();

  return (
    <Layout
      title="UI Experiments - William Martinsson | Designer & Developer"
      desc="Explore a series of UI experiments showcasing innovative animations, interactions, and design patterns that redefine digital experiences."
      framerKey="experiment"
      project
      className="w-full px-6 md:px-40"
    >
      <div className="flex flex-col relative mt-0 md:mt-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-0 mb-3 mt-6 md:mb-10 md:mt-10">
          <motion.h1
            className="text-4xl md:text-8xl font-title font-thin text-[#F7F7F7] sticky top-0"
            initial={{ opacity: 0, y: 75 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 75 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              delay: 0.1,
            }}
            layout
          >
            UI Experiments
          </motion.h1>
          <motion.span
            className="text-sm font-system lg:text-right pb-2 text-gray-400 lg:text-white flex items-end lg:max-w-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            layout
          >
            A playground to experiment with different animations, interactions,
            and design patterns.
          </motion.span>
        </div>

        {/* Main Content */}
        <div className="flex w-full">
          <div className="flex flex-col border border-dashed border-gray-400 w-full">
            {/* Navigation Pane */}
            <button
              onClick={() => setOpenExperiment("minicart")}
              className="cursor-pointer border-b border-dashed border-gray-400 flex flex-col lg:sticky top-0 w-full lg:text-left"
              aria-label="Open Mini Cart Experiment"
              // layout
            >
              <span className="text-base lg:text-xl p-4 lg:p-4 font-title">
                Minicart
              </span>
            </button>

            {/* Experiment Details */}
            {/* <AnimatePresence mode="wait"> */}
            {openExperiment === "minicart" && (
              <motion.div
                key="minicart"
                transition={{ duration: 0 }}
                className="flex flex-col"
              >
                {experimentsData.map((experiment) => (
                  <div
                    key={experiment.id}
                    className="flex flex-col lg:flex-row border-b border-dashed border-gray-400 justify-between w-full"
                    // initial={{ opacity: 0, y: 20 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0, y: 20 }}
                    // transition={{ duration: 0.4 }}
                  >
                    <div className="flex flex-col justify-start p-4 border-dashed border-gray-400 border-b lg:border-b-0 lg:border-x lg:border-y-0 lg:max-w-[250px]">
                      <h3 className="text-base lg:text-lg font-title font-medium italic text-gray-200 mb-1">
                        {experiment.title}
                      </h3>
                      <span className="text-sm font-inter text-gray-400 leading-normal">
                        {experiment.description}
                      </span>
                    </div>
                    <div className="flex p-4">
                      <MockedCartProvider>
                        <CartItems step={experiment.step} />
                      </MockedCartProvider>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            {/* </AnimatePresence> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Experiments;
