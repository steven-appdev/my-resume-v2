"use client";

import Navbar from "@/components/navbar";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center pb-20 gap-20 px-72">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-row gap-12 items-center">
            <p className="text-[64px] text-white font-mono">i am</p>
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
                wrapperClassName: "text-[64px] text-neutral-100 font-mono",
              }}
            />
          </div>
          <div>
            <p className="text-neutral-300 font-mono text-center text-xl italic">
              &quot;Hi there! My name is Steven. I am a software developer who always
              loves to challenge myself in variety of projects and also constantly adapt
              to new skills and turn them into solutions. I am very excited and I am
              committed that I would be contributing 100% of my skills, knowledge and
              passion towards any opportunities given to me in the future.&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-6">
          <button
            className="bg-neutral-100 p-3 rounded-2xl cursor-pointer"
            onClick={() => {}}
          >
            <Mail className="text-black" size={30} />
          </button>
          <button
            className="bg-neutral-100 p-3 rounded-2xl cursor-pointer"
            onClick={() => {}}
          >
            <Phone className="text-black" size={30} />
          </button>
          <button
            className="bg-neutral-100 p-3 rounded-2xl cursor-pointer"
            onClick={() => {}}
          >
            <Linkedin className="text-black" size={30} />
          </button>
          <button
            className="bg-neutral-100 p-3 rounded-2xl cursor-pointer"
            onClick={() => {}}
          >
            <Github className="text-black" size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
