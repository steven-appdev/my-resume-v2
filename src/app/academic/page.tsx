"use client";

import Navbar from "@/components/navbar";
import Roadmap from "@/components/roadmap";

export default function Academic() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-72 pt-20">
        <Roadmap
          histories={[
            {
              university: "UOW Malaysia KDU",
              award: "Diploma in Computer Studies",
              country: "Malaysia",
              honours: "Distinction",
              start: 2017,
              end: 2019,
            },
            {
              university: "Northumbria University",
              award: "Bachelor's Degree (Hons) in Computer Science",
              country: "United Kingdom",
              honours: "First Class Honour",
              start: 2020,
              end: 2022,
            },
            {
              university: "Northumbria University",
              award: "Master of Science in Advanced Computer Science",
              country: "United Kingdom",
              honours: "First Class Honour",
              start: 2023,
              end: 2024,
            },
          ]}
        />
      </div>
    </div>
  );
}
