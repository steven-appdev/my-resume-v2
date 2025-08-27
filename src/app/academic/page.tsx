"use client";

import Navbar from "@/components/navbar";

export default function Academic() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center pb-20 gap-20 px-72">
        <p className="text-neutral-100 text-[64px]">where did I Studied?</p>
      </div>
    </div>
  );
}
