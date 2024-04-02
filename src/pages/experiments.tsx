import { NextPage } from "next";
import Layout from "src/components/Layout";
import { motion } from "framer-motion";
import { CartItems } from "src/components/CartSummary";
import { MockedCartProvider } from "src/components/MockCartProvider";

const Experiments: NextPage = () => {
  return (
    <Layout
      title="Experiments - William Martinsson - Designer & Developer"
      desc="Crafting digital products. Building performant software and web experiences. Dreaming about design systems, new ways of creating components, and JavaScript. Currently designing and developing the new wave of internet art at Artscape. Helping businesses succeed under the name Oh, Hi."
      framerKey="experiment"
      project={true}
    >
      <div className="flex flex-col relative mt-0 md:mt-8">
        <motion.h1
          className="text-6xl font-title font-thin mb-3 mt-6 text-[#F7F7F7] md:mt-10 md:text-8xl md:mb-10"
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
          Experiments
        </motion.h1>
        <div className="border border-dashed border-gray-400 flex w-full">
          <div className="h-full flex flex-col w-[64px]">
            <span className="text-base lg:text-xl mt-10 font-title lg:mb-1 rotate-90">
              Minicart
            </span>
          </div>
          <div className="flex flex-row border-b border-dashed border-gray-400 justify-between align-top w-full">
            <div className="flex justify-start flex-col group py-4 transition-transform duration-350 ease-in-out transform relative border-x p-4 align-top h-full max-w-[250px] border-dashed border-gray-400 last:mb-0">
              <h3 className="text-base lg:text-lg font-title group-hover:underline font-medium italic text-gray-200">
                Iteration 1
              </h3>
              <span className="text-sm font-inter text-gray-500">
                A ordinary cart item you can see on multiple ecom websites.
                <ul>
                  <li className="decoration-dotted">
                    Minimal Interactions all around
                  </li>
                  <li className="decoration-dotted">Feels Slow</li>
                </ul>
              </span>
            </div>

            <div className="flex p-4">
              <MockedCartProvider>
                <CartItems />
              </MockedCartProvider>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Experiments;
