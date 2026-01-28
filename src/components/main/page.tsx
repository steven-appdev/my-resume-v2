import Typewriter from "typewriter-effect";
import { motion } from "motion/react";
import { ChevronDown, ChevronsDown } from "lucide-react";
import { useState } from "react";
import NextPageIndicator from "../nextpage";

export default function Main() {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  return (
    <motion.div
      className="flex flex-col min-h-screen items-center justify-center pb-32 px-6 sm:px-1 "
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
      onViewportLeave={() => setAnimationCompleted(false)}
      onAnimationComplete={() => setAnimationCompleted(true)}
    >
      <div className="flex flex-col items-center gap-12 sm:gap-16 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8 sm:gap-10 w-full">
          <div className="flex flex-col gap-3 items-center justify-center w-full min-h-[120] sm:min-h-[200px]">
            <div className="text-center w-full">
              <Typewriter
                options={{
                  strings: [
                    "I am Steven.",
                    "a Software Developer.",
                    "a Web Developer.",
                    "a IoT enthusiast.",
                    "a Game Developer.",
                    "a Self-Learner.",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 95,
                  deleteSpeed: 25,
                  cursor: "_",
                  cursorClassName: "text-3xl sm:text-[64px] text-neutral-100",
                  wrapperClassName: "text-3xl sm:text-[64px] text-neutral-100",
                }}
              />
            </div>
          </div>
          <div className="max-w-4xl px-4 md:px-8 lg:px-0">
            <p className="text-neutral-300 text-center text-base md:text-lg lg:text-xl italic leading-relaxed">
              &quot;Hi there! My name is Steven. I am a software developer who
              always loves to challenge myself in variety of projects and also
              constantly adapt to new skills and turn them into solutions. I am
              very excited and I am committed that I would be contributing 100%
              of my skills, knowledge and passion towards any opportunities
              given to me in the future.&quot;
            </p>
          </div>
        </div>

        <NextPageIndicator animationCompleted={animationCompleted} />
      </div>
    </motion.div>
  );
}
