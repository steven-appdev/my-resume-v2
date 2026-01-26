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
  link?: {
    text: string;
    url: string;
  };
};

function Showcase({ projects }: ShowcaseProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-8 sm:gap-14 px-6 sm:px-28">
      {projects &&
        projects.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeIn",
            }}
            className="bg-neutral-800 shadow-lg shadow-black min-h-[28rem] flex flex-col sm:flex-row items-center justify-center"
            key={index}
          >
            <div className="w-full sm:w-1/3 h-48 sm:h-full">
              <img
                src="/images/pexels-pixabay-206359.jpg"
                className="w-full h-full object-cover sm:object-none"
              />
            </div>
            <div className="w-full sm:w-2/3 h-full p-6 flex flex-col justify-between gap-4 sm:gap-0">
              <div className="gap-3 flex flex-col">
                <p className="text-white text-left text-lg sm:text-xl">
                  {project.title}
                </p>
                <p className="text-white text-left text-sm leading-6 sm:leading-7">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags &&
                    project.tags.map((tag) => (
                      <div key={tag} className="bg-neutral-700 px-3 py-0.5">
                        <p className="text-white text-sm">{tag}</p>
                      </div>
                    ))}
                </div>
              </div>
              {project.link && (
                <motion.button
                  type="button"
                  onClick={() =>
                    window.open(
                      project.link?.url,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="border-2 border-white w-full cursor-pointer"
                  initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
                  animate={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <motion.p
                    className="text-white py-2"
                    whileHover={{ color: "#000000" }}
                    transition={{ duration: 0.1 }}
                  >
                    {project.link.text}
                  </motion.p>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
    </div>
  );
}

export default function PastProject({ direction }: { direction: string }) {
  const { data: projectsData } = trpc.project.getAll.useQuery();
  return (
    <motion.div
      className="flex flex-col min-h-screen items-center justify-center pt-20 sm:pt-36 pb-24 sm:pb-48 gap-10 sm:gap-16"
      initial={{ opacity: 0, y: direction === "up" ? 100 : -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-white text-2xl sm:text-[38px]">
        here are my Projects.
      </p>
      {projectsData ? (
        <Showcase
          projects={projectsData.map((project) => ({
            title: project.title,
            type: "",
            description: project.description,
            tags: project.tags,
            ...(project.urlDisplayText &&
              project.url && {
                link: {
                  text: project.urlDisplayText || "View Project",
                  url: project.url,
                },
              }),
          }))}
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
