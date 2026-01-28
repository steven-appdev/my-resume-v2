import { Technical } from "@/generated/prisma/client";
import { trpc } from "@/trpc/client";
import { ImageOff } from "lucide-react";
import { motion } from "motion/react";

type SkillProps = {
  skills: Technical[];
};

function Skill({ skills }: SkillProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 w-full gap-8 sm:gap-14 px-6 sm:px-28">
      {skills &&
        skills.map((skill, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeIn",
            }}
            className="bg-neutral-800 shadow-lg shadow-black min-h-40 flex flex-col"
            key={index}
          >
            <div className="flex flex-row items-center gap-6 px-7 pb-3 pt-5">
              {skill.imgSrc ? (
                <img src={skill.imgSrc ?? ""} className="w-16 h-16" />
              ) : (
                <div className="w-16 h-16 bg-neutral-700 flex items-center justify-center">
                  <ImageOff className="text-neutral-500" size={48} />
                </div>
              )}
              <p className="text-white text-left text-lg sm:text-xl">
                {skill.skill}
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-2 px-7 pt-2">
              <div className="flex flex-row justify-between">
                <p className="text-white text-sm">Proficiency</p>
                <p className="text-white text-sm">{skill.proficiency}%</p>
              </div>
              <div className="relative h-2 w-full bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: false }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );
}

export default function Skills({ direction }: { direction: string }) {
  const { data: technicalData } = trpc.technical.getAll.useQuery();
  return (
    <motion.div
      className="flex flex-col min-h-screen items-center justify-center pt-20 sm:pt-36 pb-24 sm:pb-48 gap-10 sm:gap-16"
      initial={{ opacity: 0, y: direction === "up" ? 100 : -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-white text-2xl sm:text-[38px]">here are my Skills.</p>
      {technicalData ? (
        <Skill
          skills={technicalData.map((technical) => ({
            id: technical.id,
            skill: technical.skill,
            proficiency: technical.proficiency,
            imgSrc: technical.imgSrc,
          }))}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 w-full gap-8 sm:gap-14 px-6 sm:px-28">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              className="bg-neutral-800 shadow-lg shadow-black min-h-40 flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="flex flex-row items-center gap-6 px-7 pb-3 pt-5">
                <motion.div
                  className="w-16 h-16 bg-neutral-700 rounded"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="bg-neutral-700 h-6 w-32 rounded"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.1,
                  }}
                />
              </div>
              <div className="flex-1 flex flex-col gap-2 px-7 pt-2">
                <div className="flex flex-row justify-between">
                  <motion.div
                    className="bg-neutral-700 h-4 w-20 rounded"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  />
                  <motion.div
                    className="bg-neutral-700 h-4 w-10 rounded"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  />
                </div>
                <motion.div
                  className="h-2 w-full bg-neutral-700 rounded-full"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
