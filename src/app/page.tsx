"use client";

import Navbar from "@/components/navbar";
import { Gamepad, Github, Linkedin, Mail, Phone } from "lucide-react";
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

        <div className="flex flex-row gap-14">
          <button
            className="cursor-pointer"
            onClick={() => (window.location.href = "mailto:steven-appdev@outlook.com")}
          >
            <Mail
              className="text-neutral-100 hover:text-neutral-400 transition duration-200 ease-in-out"
              size={30}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => (window.location.href = "tel:+60102959289")}
          >
            <Phone
              className="text-neutral-100 hover:text-neutral-400 transition duration-200 ease-in-out"
              size={30}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => window.open("https://stevenplus.itch.io/", "_blank")}
          >
            <Gamepad
              className="text-neutral-100 hover:text-neutral-400 transition duration-200 ease-in-out"
              size={30}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() =>
              window.open("https://www.linkedin.com/in/teck-xun-t-990149116/", "_blank")
            }
          >
            <Linkedin
              className="text-neutral-100 hover:text-neutral-400 transition duration-200 ease-in-out"
              size={30}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => window.open("https://github.com/steven-appdev", "_blank")}
          >
            <Github
              className="text-neutral-100 hover:text-neutral-400 transition duration-200 ease-in-out"
              size={30}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
