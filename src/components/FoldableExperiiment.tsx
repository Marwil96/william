// components/FoldableExperiment.tsx
import { motion } from "framer-motion";
import React from "react";

interface FoldableExperimentProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const foldVariants = {
  closed: {
    rotateY: -90,
    opacity: 0,
    transition: { duration: 0.5 },
  },
  open: {
    rotateY: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const FoldableExperiment: React.FC<FoldableExperimentProps> = ({
  isOpen,
  children,
}) => {
  return (
    <motion.div
      className="foldable-experiment"
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      variants={foldVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      {children}
    </motion.div>
  );
};

export default FoldableExperiment;
