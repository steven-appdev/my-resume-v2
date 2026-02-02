"use client";

import { motion, Variants } from "motion/react";
import React, { useState } from "react";
import NextPageIndicator from "../nextpage";

type RoadmapProps = {
  histories: AcademicHistoryType[];
  onComplete: () => void;
};

type AcademicHistoryType = {
  university: string;
  award: string;
  country: string;
  honours: string;
  start: number;
  end: number;
};

function Roadmap({ histories, onComplete }: RoadmapProps) {
  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="relative flex flex-col"
      onAnimationComplete={onComplete}
    >
      <motion.div
        variants={lineVariants}
        className="absolute hidden 2xl:block top-[96.5%] w-full border-dashed border border-white -translate-y-[59px]"
      />
      <motion.div
        variants={lineVariants}
        className="absolute 2xl:hidden left-1/2 h-full border-dashed border border-white -translate-x-[3px]"
      />
      <div className="flex flex-col 2xl:flex-row gap-12 2xl:gap-20">
        {histories &&
          histories.length > 0 &&
          histories.map((history, index) => (
            <React.Fragment key={index}>
              <motion.div
                variants={cardVariants}
                className="flex flex-col gap-6 2xl:gap-8 items-center z-50"
              >
                <div className="w-full max-w-sm 2xl:w-96 h-full bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-xl shadow-black/50 px-6 py-5 2xl:px-8 2xl:py-7 flex flex-col gap-4 2xl:gap-5 2xl:border-0">
                  <div className="h-full">
                    <p className="text-white text-left text-base 2xl:text-lg leading-snug">
                      {history.award}
                    </p>
                  </div>
                  <div className="flex flex-col h-1/2">
                    <p className="text-white text-left text-sm">
                      {history.university}
                    </p>
                    <p className="text-white text-left text-sm">
                      {history.country}
                    </p>
                  </div>
                </div>
                <div className="items-center flex justify-center">
                  <div className="z-50 w-5 h-5 2xl:w-6 2xl:h-6 border ring ring-white ring-offset-2 bg-white rounded-full -translate-x-0.5 2xl:translate-0" />
                </div>
                <div className="items-center flex justify-center">
                  <p className="text-black 2xl:text-white text-center text-sm 2xl:text-base bg-white px-3 py-1 2xl:p-0 rounded-xl 2xl:bg-transparent 2xl:rounded-none">
                    {history.start}
                  </p>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
      </div>
    </motion.div>
  );
}

export default function Academic() {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  return (
    <motion.div
      className="flex flex-col min-h-screen items-center justify-center pb-12"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      onViewportLeave={() => setAnimationCompleted(false)}
    >
      <div className="flex flex-col w-full items-center justify-center px-6 2xl:px-72 gap-10 2xl:gap-16">
        <p className="text-white text-2xl 2xl:text-[38px]">education journey</p>
        <Roadmap
          histories={[
            {
              university: "UOW Malaysia KDU",
              award: "Diploma in Computer Studies",
              country: "Malaysia",
              honours: "Distinction",
              start: 2017,
              end: 2019,
            },
            {
              university: "Northumbria University",
              award: "Bachelor's Degree (Hons) in Computer Science",
              country: "United Kingdom",
              honours: "First Class Honour",
              start: 2020,
              end: 2022,
            },
            {
              university: "Northumbria University",
              award: "Master of Science in Advanced Computer Science",
              country: "United Kingdom",
              honours: "First Class Honour",
              start: 2023,
              end: 2024,
            },
          ]}
          onComplete={() => setAnimationCompleted(true)}
        />
        <div className="pt-6 2xl:pt-9 2xl:pb-0">
          <NextPageIndicator animationCompleted={animationCompleted} />
        </div>
      </div>
    </motion.div>
  );
}
