"use client";

import { motion, Variants } from "motion/react";
import React from "react";

type RoadmapProps = {
  histories: AcademicHistoryType[];
};

type AcademicHistoryType = {
  university: string;
  award: string;
  country: string;
  honours: string;
  start: number;
  end: number;
};

function Roadmap({ histories }: RoadmapProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scaleX: 0, originX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: -30,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="relative border-2 border-dashed border-white w-4/5"
      >
        {histories &&
          histories.length > 0 &&
          histories.map((history, index) => (
            <React.Fragment key={index}>
              <motion.div
                variants={itemVariants}
                className={`absolute w-6 h-6 border ring ring-white ring-offset-2 border-gap-2 bg-white rounded-full top-1/2 -translate-y-1/2`}
                style={{ left: `${(index / (histories.length - 1)) * 100}%` }}
              />
              <motion.div
                variants={cardVariants}
                className={`absolute flex flex-col items-center justify-center w-1/3 px-10 h-44 -translate-x-[45%] -translate-y-60 gap-4 shadow-lg shadow-black hover:shadow-xl transition ease-in-out duration-300 bg-neutral-800`}
                style={{ left: `${(index / (histories.length - 1)) * 100}%` }}
              >
                <p className="text-white text-center text-lg">
                  {history.award}
                </p>
                <div className="flex flex-col">
                  <p className="text-white text-center text-sm">
                    {history.university}
                  </p>
                  <p className="text-white text-center text-sm">
                    {history.country}
                  </p>
                </div>
              </motion.div>
              <div
                className={`absolute w-[250px] -translate-x-[45%] translate-y-8`}
                style={{
                  left: `${(index / (histories.length - 1)) * 100}%`,
                }}
              >
                <p className="text-white text-center text-sm">
                  {history.start}
                </p>
              </div>
            </React.Fragment>
          ))}
      </motion.div>
    </>
  );
}

export default function Academic({ direction }: { direction: string }) {
  return (
    <motion.div
      className="flex flex-col h-screen"
      initial={{ opacity: 0, y: direction === "up" ? 100 : -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex-grow flex flex-col items-center justify-center px-72 pt-20">
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
        />
      </div>
    </motion.div>
  );
}
