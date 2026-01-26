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
    <div className="grid grid-cols-2 w-full gap-14 px-28">
      {projects &&
        projects.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{
              ease: "easeIn",
            }}
            className="bg-neutral-800 shadow-lg shadow-black min-h-[28rem] flex flex-row items-center justify-center"
            key={index}
          >
            <div className="w-1/3 h-full">
              <img
                src="/images/pexels-pixabay-206359.jpg"
                className="w-full h-full object-none"
              />
            </div>
            <div className="w-2/3 h-full p-6 flex flex-col justify-between">
              <div className="gap-3 flex flex-col">
                <p className="text-white text-left text-xl">{project.title}</p>
                <p className="text-white text-left text-sm leading-7">
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
      className="flex flex-col min-h-screen items-center justify-center pt-36 pb-48 gap-16"
      initial={{ opacity: 0, y: direction === "up" ? 100 : -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-white text-[38px]">here are my Projects.</p>
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
        <div className="text-white">Loading projects...</div>
      )}

      {/* <Showcase
        projects={[
          {
            title: "My Resume V2",
            type: "Self Improvement",
            description:
              "A personal portfolio and resume website built with ReactJS and Tailwind CSS. Designed to showcase my professional journey and projects, this site serves as both a central hub for my work and a practical application of my front-end development skills.",
            tags: ["React", "NextJS", "Tailwind", "Motion"],
            link: {
              text: "Source Code",
              url: "https://github.com/steven-appdev/my-resume-v2",
            },
          },
          {
            title: "Smart Plant Caring System using IoT",
            type: "Bachelor's Degree Final Year Project",
            description:
              "An automated plant maintenance system developed for my Bachelor's Final Year Project. It utilizes IoT sensors to monitor plant health and a custom web dashboard to visualize real-time data. This project integrates a robust stack including MQTT, InfluxDB, and Docker.",
            tags: [
              "PHP",
              "IoT",
              "Docker",
              "MSSQL",
              "MQTT",
              "Telegraf",
              "InfluxDB",
              "Bootstrap",
              "JavaScript",
            ],
            link: {
              text: "View Dissertation",
              url: "/documents/spcs-dissertation.pdf",
            },
          },
          {
            title: "Starducks Coffee",
            type: "Self Improvement",
            description:
              "A fast-paced management game developed in C# using the Godot engine for Coffee Jam 2023. Created within a 14-day timeframe, players take on the role of a barista managing customer orders and patience, emphasizing game logic and time-management mechanics.",
            tags: ["Godot", "C#", "Aseprite", "Game Jam"],
            link: {
              text: "Itch.io Page",
              url: "https://stevenplus.itch.io/starducks-coffee",
            },
          },
          {
            title: "Interaction Visualisation for National Student Survey Data",
            type: "Master's Degree Final Year Project",
            description:
              "Part of my Master's Final Year Project, this interactive dashboard visualizes National Student Survey (NSS) metrics. Built with TypeScript and React, it allows users to analyze institutional performance, positivity scores, and student satisfaction through intuitive data visualization.",
            tags: ["Typescript", "React", "Tailwind", "MySQL", "PHP"],
            link: {
              text: "View Dissertation",
              url: "/documents/nss-dissertation.pdf",
            },
          },
          {
            title:
              "National Student Survey (NSS) Data Integration System using ETL Approach",
            type: "Master's Degree Final Year Project",
            description:
              "A cloud-based ETL system built with Python, Spark, and Docker on Azure. Engineered to process and integrate big data (NSS surveys) into a central database with high efficiency and scalability.",
            tags: [
              "Python",
              "Apache Spark",
              "ETL Approach",
              "Microsoft Azure",
              "Docker",
              "Big Data",
            ],
            link: {
              text: "Source Code",
              url: "https://github.com/steven-appdev/nss-integration-api",
            },
          },
        ]}
      /> */}
    </motion.div>
  );
}
