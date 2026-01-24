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
        className="absolute top-[96.5%] w-full border-dashed border border-white -translate-y-[59px]"
      />
      <div className="flex flex-row gap-20">
        {histories &&
          histories.length > 0 &&
          histories.map((history, index) => (
            <React.Fragment key={index}>
              <motion.div
                variants={cardVariants}
                className="flex flex-col gap-8"
              >
                <div className="w-96 h-full bg-neutral-800 shadow-lg shadow-black px-8 py-7 flex flex-col gap-5">
                  <div className="h-full">
                    <p className="text-white text-left text-lg">
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
                  <div className="z-50 w-6 h-6 border ring ring-white ring-offset-2 ring- ring- border-gap-2 bg-white rounded-full" />
                </div>
                <div className="items-center flex justify-center">
                  <p className="text-white text-center text-base">
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

export default function Academic({ direction }: { direction: string }) {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  return (
    <motion.div
      className="flex flex-col h-screen items-center justify-center pb-24"
      initial={{ opacity: 0, y: direction === "up" ? 100 : -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      onViewportLeave={() => setAnimationCompleted(false)}
    >
      <div className="flex flex-col w-full items-center justify-center px-72 gap-16">
        <p className="text-white text-[38px]">education journey</p>
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
        <div className="pt-9">
          <NextPageIndicator animationCompleted={animationCompleted} />
        </div>
      </div>
    </motion.div>
  );
}
