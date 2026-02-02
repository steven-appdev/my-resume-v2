"use client";

import Academic from "@/components/academic/page";
import Experience from "@/components/experience/page";
import Footer from "@/components/footer";
import Main from "@/components/main/page";
import PastProject from "@/components/projects/page";
import Skills from "@/components/skills/page";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import Typewriter from "typewriter-effect";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll({
    container: containerRef,
  });
  const [direction, setDirection] = useState("down");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous) {
      setDirection("down");
    } else {
      setDirection("up");
    }
    console.log(direction);
  });

  return (
    <main
      ref={containerRef}
      className="flex flex-col h-screen snap-y snap-mandatory overflow-y-scroll"
    >
      <section id="main" className="snap-none sm:snap-start">
        <Main />
      </section>
      <section id="academic" className="snap-none sm:snap-start">
        <Academic />
      </section>
      <section id="experience" className="snap-none sm:snap-start">
        <Experience />
      </section>
      <section id="past-project" className="snap-none sm:snap-start">
        <PastProject />
      </section>
      <section id="skills" className="snap-none sm:snap-start">
        <Skills />
      </section>
      <section id="footer" className="snap-none sm:snap-start">
        <p className="text-slate-100 italic text-4xl text-center mb-44">
          &quot;And countless to explore in the future...&quot;
        </p>
        <Footer />
      </section>
    </main>
  );
}
