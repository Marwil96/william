import { NextPage } from "next";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Layout from "src/components/Layout";
import { CartItems } from "src/components/CartSummary";
import { MockedCartProvider } from "src/components/MockCartProvider";
import { DynamicIsland } from "src/components/dynamic-island/DynamicIsland";

interface Experiment {
  id: string;
  title: string;
  description: JSX.Element;
  step: number;
}

const Test: NextPage = () => {
  return (
    <Layout
      title="UI Experiments - William Martinsson | Designer & Developer"
      desc="Explore a series of UI experiments showcasing innovative animations, interactions, and design patterns that redefine digital experiences."
      framerKey="experiment"
      project
      className="w-full px-6 md:px-40"
    >
      <DynamicIsland />
    </Layout>
  );
};

export default Test;
