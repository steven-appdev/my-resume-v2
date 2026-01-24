import Typewriter from "typewriter-effect";
import { motion } from "motion/react";
import { ChevronDown, ChevronsDown } from "lucide-react";
import { useState } from "react";
import NextPageIndicator from "../nextpage";

export default function Main() {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  return (
    <motion.div
      className="flex flex-col h-screen items-center justify-center pb-24 px-72"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.85 }}
      transition={{ duration: 0.8 }}
      onViewportLeave={() => setAnimationCompleted(false)}
      onAnimationComplete={() => setAnimationCompleted(true)}
    >
      <div className="flex flex-col items-center gap-32">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-row gap-12 items-center">
            <p className="text-[64px] text-white">i am</p>
            <Typewriter
              options={{
                strings: [
                  "Steven.",
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
                cursorClassName: "text-[64px] text-neutral-100",
                wrapperClassName: "text-[64px] text-neutral-100",
              }}
            />
          </div>
          <div>
            <p className="text-neutral-300 text-center text-xl italic">
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
