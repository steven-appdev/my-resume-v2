import { trpc } from "@/trpc/client";
import { motion } from "motion/react";

type ShowcaseProps = {
  projects: ShowcaseType[];
};

type ShowcaseType = {
  title: string;
  type: string;
  description: string;
  tags: string[];
  timeRange?: string;
  link?: {
    text: string;
    url: string;
  };
};

function Showcase({ projects }: ShowcaseProps) {
  return (
    <div className="grid grid-cols-1 w-full gap-8 sm:gap-10 px-6 sm:px-28">
      {projects &&
        projects.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeIn",
              delay: index * 0.1,
            }}
            className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-xl shadow-black/50 overflow-hidden group"
            key={index}
          >
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

            {/* Hover effect gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 pointer-events-none"
              whileHover={{
                background:
                  "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))",
              }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative p-8 sm:p-10 flex flex-col gap-6">
              {/* Header section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-blue-400 text-base sm:text-lg font-medium">
                      {project.type}
                    </p>
                  </div>
                  {project.timeRange && (
                    <div className="flex items-center gap-2 text-neutral-400">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm sm:text-base font-medium whitespace-nowrap">
                        {project.timeRange}
                      </span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-neutral-700 via-neutral-600 to-transparent" />
              </div>

              {/* Description */}
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed sm:leading-7">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags &&
                  project.tags.map((tag, tagIndex) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * tagIndex }}
                      className="bg-neutral-700/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-neutral-600/50 hover:border-blue-500/50 hover:bg-neutral-700 transition-all duration-200"
                    >
                      <p className="text-neutral-200 text-xs sm:text-sm font-medium">
                        {tag}
                      </p>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );
}

export default function Experience() {
  const { data: experienceData } = trpc.experience.getAll.useQuery();
  return (
    <motion.div
      className="flex flex-col min-h-screen items-center justify-center pt-20 sm:pt-36 pb-24 sm:pb-48 gap-10 sm:gap-16"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-white text-2xl sm:text-[38px]">
        professional experience
      </p>
      {experienceData ? (
        <Showcase
          projects={experienceData.map((experience) => {
            const startDate = new Date(experience.startDate);
            const endDate = experience.endDate
              ? new Date(experience.endDate)
              : null;
            const formatDate = (date: Date) =>
              date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              });
            const timeRange = `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "Present"}`;

            return {
              title: experience.position,
              type: experience.company,
              description: experience.description,
              tags: experience.tags,
              timeRange,
            };
          })}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8 sm:gap-14 px-6 sm:px-28">
          {[1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="bg-neutral-800 shadow-lg shadow-black min-h-[28rem] flex flex-col sm:flex-row items-center justify-center overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="w-full sm:w-1/3 h-48 sm:h-full bg-neutral-700"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="w-full sm:w-2/3 h-full p-6 flex flex-col justify-between gap-4">
                <div className="gap-3 flex flex-col">
                  <motion.div
                    className="bg-neutral-700 h-7 w-3/4 rounded"
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
                  <motion.div
                    className="bg-neutral-700 h-4 w-full rounded mt-2"
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
                    className="bg-neutral-700 h-4 w-full rounded"
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
                  <motion.div
                    className="bg-neutral-700 h-4 w-2/3 rounded"
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
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[1, 2, 3].map((tagIndex) => (
                      <motion.div
                        key={tagIndex}
                        className="bg-neutral-700 h-6 w-16 rounded"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5 + tagIndex * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <motion.div
                  className="border-2 border-neutral-700 w-full h-10 rounded"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
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
