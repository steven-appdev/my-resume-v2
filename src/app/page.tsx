"use client";

import Academic from "@/components/academic/page";
import Footer from "@/components/footer";
import Main from "@/components/main/page";
import PastProject from "@/components/projects/page";
import Skills from "@/components/skills/page";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

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
      <section id="main" className="snap-start">
        <Main />
      </section>
      <section id="academic" className="snap-start">
        <Academic direction={direction} />
      </section>
      <section id="past-project" className="snap-start">
        <PastProject direction={direction} />
      </section>
      <section id="skills" className="snap-start">
        <Skills direction={direction} />
      </section>
      <section id="footer" className="snap-start">
        <Footer />
      </section>
    </main>
  );
}
