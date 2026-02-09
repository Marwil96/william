import { NextPage } from "next";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Layout from "src/components/Layout";
import { CartItems } from "src/components/CartSummary";
import { MockedCartProvider } from "src/components/MockCartProvider";

// Dynamic import for DynamicIsland (keeps react-use-measure out of initial bundle)
const DynamicIslandDemo = dynamic(
  () =>
    import("src/components/dynamic-island/DynamicIsland").then((mod) => ({
      default: mod.DynamicIsland,
    })),
  { ssr: false, loading: () => <div className="h-[44px]" /> }
);

// ─── Experiment Data ─────────────────────────────────────────────
// To add a new experiment: add an entry here + a case in ExperimentDemo

interface ExperimentIteration {
  id: string;
  label: string;
  description: string;
  step: number;
}

interface ExperimentConfig {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  iterations?: ExperimentIteration[];
}

const experiments: ExperimentConfig[] = [
  {
    id: "minicart",
    title: "Minicart",
    shortDescription:
      "Three iterations of a cart UI, from static to optimistic.",
    description:
      "An exploration of how animation and optimistic updates can transform a basic cart interaction into something that feels instant and alive.",
    tags: ["React", "Motion", "Optimistic UI", "E-commerce"],
    iterations: [
      {
        id: "classic",
        label: "Classic",
        description:
          "A traditional cart item experience. Basic interactions, no animations, static design.",
        step: 0,
      },
      {
        id: "animated",
        label: "Animated",
        description:
          "Smooth transitions for removals and dynamic loading indicators for quantity changes.",
        step: 1,
      },
      {
        id: "optimistic",
        label: "Optimistic",
        description:
          "Changes reflected instantly with optimistic updates — boosting perceived performance.",
        step: 2,
      },
    ],
  },
  {
    id: "dynamic-island",
    title: "Dynamic Island",
    shortDescription:
      "A spatial UI element inspired by iOS, reimagined for web.",
    description:
      "A persistent, morphing element that adapts its shape and content using spring physics and letter-by-letter blur animations.",
    tags: ["React", "Motion", "Spatial UI", "Spring Physics"],
  },
];

// ─── Minicart Demo ───────────────────────────────────────────────

const MinicartDemo = ({
  iterations,
}: {
  iterations: ExperimentIteration[];
}) => {
  const [active, setActive] = useState(0);

  return (
    <>
      <div
        className="flex border-b border-dashed border-gray-400"
        role="tablist"
        aria-label="Cart iterations"
      >
        {iterations.map((iter, i) => (
          <button
            key={iter.id}
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${iter.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={clsx(
              "flex-1 py-3 text-xs font-inter uppercase tracking-[0.1em] text-center transition-colors duration-200 border-r last:border-r-0 border-dashed border-gray-400 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              active === i
                ? "text-[#F7F7F7] bg-[#1e1e1e]"
                : "text-gray-500 hover:text-gray-300"
            )}
          >
            {iter.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-3 border-b border-dashed border-gray-400">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            className="text-xs font-system text-gray-400 leading-relaxed"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
          >
            {iterations[active].description}
          </motion.p>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id={`panel-${iterations[active].id}`}
          role="tabpanel"
          className="flex items-center justify-center p-6 md:p-10 w-full min-h-[400px] md:min-h-[500px]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <MockedCartProvider>
            <CartItems step={iterations[active].step} />
          </MockedCartProvider>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

// ─── Dynamic Island Demo ─────────────────────────────────────────

const DynamicIslandDemoWrapper = () => (
  <div className="relative w-full min-h-[250px] [&>div]:left-1/2 [&>div]:-translate-x-1/2 [&>div]:top-1/2 [&>div]:-translate-y-1/2">
    <DynamicIslandDemo />
  </div>
);

// ─── Experiment Demo Renderer ────────────────────────────────────

const ExperimentDemo = ({
  experiment,
}: {
  experiment: ExperimentConfig;
}) => {
  switch (experiment.id) {
    case "minicart":
      return <MinicartDemo iterations={experiment.iterations!} />;
    case "dynamic-island":
      return <DynamicIslandDemoWrapper />;
    default:
      return null;
  }
};

// ─── Page ────────────────────────────────────────────────────────

const ExperimentsV2: NextPage = () => {
  return (
    <Layout
      title="Experiments - William Martinsson | Designer & Developer"
      desc="A laboratory for interaction design. Each experiment explores a different pattern — from cart optimism to spatial UI."
      framerKey="experiments-v2"
      project
      className="w-full px-6 md:px-40"
    >
      <div className="flex flex-col relative mt-6 md:mt-10">
        {/* ─── Header ─── */}
        <motion.h1
          className="text-4xl md:text-7xl lg:text-8xl font-title font-thin italic leading-[0.95]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 22,
            stiffness: 90,
            delay: 0.05,
          }}
        >
          Experiments
        </motion.h1>

        <motion.p
          className="text-sm md:text-base font-system text-gray-400 mt-3 md:mt-4 max-w-[420px] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          A laboratory for interaction design. Each experiment explores a
          different pattern — from cart optimism to spatial UI.
        </motion.p>

        <motion.span
          className="text-xs font-inter uppercase tracking-[0.2em] text-gray-500 mt-6 md:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {experiments.length} experiments
        </motion.span>

        {/* ─── Index Strip ─── */}
        <div className="flex flex-col md:flex-row border-t border-dashed border-gray-400 w-full mt-6 md:mt-10">
          {experiments.map((exp, index) => (
            <motion.a
              key={exp.id}
              href={`#${exp.id}`}
              className="group flex-1 border-b md:border-b-0 md:border-r last:border-r-0 border-dashed border-gray-400 p-4 md:p-6 text-left transition-colors duration-200 hover:bg-[#1e1e1e] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + index * 0.08,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
            >
              <span className="text-xs font-inter uppercase tracking-[0.15em] text-gray-500 mb-2 block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base md:text-lg font-title italic font-medium text-gray-200 group-hover:text-white transition-colors duration-200 mb-1">
                {exp.title}
              </h3>
              <span className="text-xs font-system text-gray-500 line-clamp-2">
                {exp.shortDescription}
              </span>
            </motion.a>
          ))}
        </div>

        {/* ─── Experiment Sections ─── */}
        {experiments.map((experiment, index) => (
          <motion.section
            key={experiment.id}
            id={experiment.id}
            className="border-t border-dashed border-gray-400 pt-8 md:pt-12 pb-10 md:pb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
          >
            <div className="flex flex-col lg:flex-row lg:gap-12">
              {/* Left: Metadata */}
              <div className="lg:w-[280px] lg:flex-shrink-0 mb-6 lg:mb-0">
                <span className="text-xs font-inter uppercase tracking-[0.2em] text-gray-500 mb-3 block">
                  Experiment {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl md:text-3xl font-title italic font-light mb-3 leading-tight">
                  {experiment.title}
                </h2>
                <p className="text-sm font-system text-gray-400 leading-relaxed mb-4">
                  {experiment.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experiment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-inter uppercase tracking-[0.1em] text-gray-500 border border-dashed border-gray-600 px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Demo Frame */}
              <div className="flex-1">
                <div className="border border-dashed border-gray-400 bg-[#0d0d0d] relative overflow-hidden flex flex-col">
                  <span className="absolute top-3 left-3 text-[10px] font-inter uppercase tracking-[0.15em] text-gray-600 select-none pointer-events-none z-10">
                    Live preview
                  </span>
                  <div className="pt-8">
                    <ExperimentDemo experiment={experiment} />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </Layout>
  );
};

export default ExperimentsV2;
