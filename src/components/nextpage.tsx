import { useState } from "react";
import { motion, Variants } from "motion/react";
import { ChevronsDown } from "lucide-react";

type IndicatorProps = {
  animationCompleted: boolean;
};

export default function NextPageIndicator({
  animationCompleted,
}: IndicatorProps) {
  const indicatorVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (isDone: boolean) => ({
      opacity: isDone ? 1 : 0, // Stay hidden until parent says 'go'
      y: isDone ? [0, -15, 0] : 0,
      transition: {
        y: {
          repeat: isDone ? Infinity : 0,
          duration: 1.5,
          ease: "easeInOut",
        },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <motion.div
      variants={indicatorVariants}
      initial="hidden"
      whileInView="visible"
      custom={animationCompleted}
      viewport={{ once: false, amount: 0.1 }}
    >
      <ChevronsDown className="text-neutral-300 text-4xl" size={30} />
    </motion.div>
  );
}
