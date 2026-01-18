import { motion } from "motion/react";

type ShowcaseProps = {
  projects: ShowcaseType[];
};

type ShowcaseType = {
  title: string;
  type: string;
  description: string;
  tags: string[];
  link?: string;
};

function Showcase({ projects }: ShowcaseProps) {
  return (
    <div className="grid grid-cols-3 w-full gap-14 px-52">
      {projects &&
        projects.map((project) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeIn",
            }}
            className="bg-neutral-800 shadow-lg shadow-black min-h-64 flex flex-col items-center px-9 py-8 gap-4 justify-center"
          >
            <p className="text-white text-center text-2xl">{project.title}</p>
            <p className="text-white text-center text-xs">{project.type}</p>
          </motion.div>
        ))}
    </div>
  );
}

export default function PastProject({ direction }: { direction: string }) {
  return (
    <motion.div
      className="flex flex-col min-h-screen items-center justify-center pt-72 pb-32 gap-16"
      initial={{ opacity: 0, y: direction === "up" ? 100 : -100 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-white text-[64px]">here are my Projects.</p>
      <Showcase
        projects={[
          {
            title: "My Resume",
            type: "Self Improvement",
            description:
              "The website you are currently looking at! The website was developed entirely using ReactJS with the support of Tailwind CSS. The website consists of numerous information about me, ranging from something about me to my personal projects that I had worked on. The purpose of the website is to both polish my React skills alongside with creating a space that could served as my portfolio.",
            tags: ["React", "Tailwind", "Motion"],
          },
          {
            title: "Pointless Calculator API",
            type: "Self Improvement",
            description:
              "Ever find an API that makes you ask why it exist? Pointless Calculator is that API that calculates two numbers using various operators. But on all seriousness, this is a self improvement project to polish my Python skill and learn Flask.",
            tags: ["Python", "Flask"],
          },
          {
            title: "Smart Plant Caring System using IoT",
            type: "Bachelor's Degree Final Year Project",
            description:
              "A smart device that adopted the IoT technology with the combination of sensor to automate the process of taking cares of a plant. The project also features a website that visualise all the collected data. Feel free to download my dissertation that has been written and submitted in partial fulfilment of the regulations governing the award of the Degree of BSc. (Honours) Computer Science.",
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
          },
          {
            title: "Starducks Coffee",
            type: "Self Improvement",
            description:
              "Starduck Coffee is a game made using Godot for Coffee Jam 2023 under 14 days. You play as Mocha, who is a new employee at Starduck Coffee. Your job is to serve as many customers as possible without making them run out of patience or making any rookie mistakes.",
            tags: ["Godot", "C#", "Aseprite", "Game Jam"],
          },
          {
            title: "Interaction Visualisation for National Student Survey Data",
            type: "Master's Degree Final Year Project",
            description:
              "An interactive dashboard has been developed to visualises the National Student Survey (NSS) data (e.g., Positivity Scores, Response Rate). The NSS is an annual survey published to assist higher education institutions in evaluating teaching performance and student satisfaction.",
            tags: ["Typescript", "React", "Tailwind", "MySQL", "PHP"],
          },
          {
            title:
              "National Student Survey (NSS) Data Integration System using ETL Approach",
            type: "Master's Degree Final Year Project",
            description:
              "Researched and developed as part of the master’s degree project by conceptualising a solution for integrating future NSS data into the existing database. The integration system hosted on a Microsoft Azure cloud Docker environment was developed using an ETL approach designed to allow big CSV data to be Extracted and Transformed before Loaded into the database.",
            tags: [
              "Python",
              "Apache Spark",
              "ETL Approach",
              "Microsoft Azure",
              "Docker",
              "Big Data",
            ],
          },
        ]}
      />
    </motion.div>
  );
}
