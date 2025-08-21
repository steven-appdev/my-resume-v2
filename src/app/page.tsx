"use client";

import Navbar from "@/components/navbar";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-row gap-12 items-center mb-20">
          <p className="text-[88px] text-white font-mono">i am</p>
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
              cursorClassName: "text-[88px] text-neutral-100",
              wrapperClassName: "text-[88px] text-neutral-100 font-mono",
            }}
          />
        </div>
      </div>
    </div>
  );
}
