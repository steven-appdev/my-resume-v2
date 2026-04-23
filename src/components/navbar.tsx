"use client";

import { Gamepad, Github, Linkedin, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 flex justify-between px-4 sm:px-16 lg:px-36 py-3 sm:py-5 bg-black text-white">
        <p
          className="text-sm sm:text-lg font-semibold"
          suppressHydrationWarning
        >
          Steven&apos;s Portfolio
        </p>

        {/* Desktop icons */}
        <div className="hidden sm:flex flex-row gap-4 sm:gap-16">
          <button
            className="cursor-pointer"
            onClick={() =>
              (window.location.href = "mailto:steven-appdev@outlook.com")
            }
          >
            <Mail
              className="text-neutral-100 hover:text-neutral-400 transition duration-200 ease-in-out"
              size={20}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => (window.location.href = "tel:+60102959289")}
          >
            <Phone
              className="text-neutral-100 hover:text-neutral-400 transition duration-100 ease-in-out"
              size={20}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => window.open("https://stevenplus.itch.io/", "_blank")}
          >
            <Gamepad
              className="text-neutral-100 hover:text-neutral-400 transition duration-100 ease-in-out"
              size={20}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/teck-xun-t-990149116/",
                "_blank",
              )
            }
          >
            <Linkedin
              className="text-neutral-100 hover:text-neutral-400 transition duration-100 ease-in-out"
              size={20}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() =>
              window.open("https://github.com/steven-appdev", "_blank")
            }
          >
            <Github
              className="text-neutral-100 hover:text-neutral-400 transition duration-100 ease-in-out"
              size={20}
            />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu className="text-neutral-100" size={22} />
        </button>
      </div>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-56 bg-neutral-900 border-l border-neutral-700 flex flex-col gap-6 px-6 py-8 transition-transform duration-300 sm:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-white text-sm font-semibold">Connect</p>
          <button onClick={() => setDrawerOpen(false)}>
            <X className="text-neutral-400" size={20} />
          </button>
        </div>

        <button
          className="flex items-center gap-4 text-neutral-100 hover:text-neutral-400 transition cursor-pointer"
          onClick={() => {
            window.location.href = "mailto:steven-appdev@outlook.com";
            setDrawerOpen(false);
          }}
        >
          <Mail size={20} />
          <span className="text-sm">Email</span>
        </button>

        <button
          className="flex items-center gap-4 text-neutral-100 hover:text-neutral-400 transition cursor-pointer"
          onClick={() => {
            window.location.href = "tel:+60102959289";
            setDrawerOpen(false);
          }}
        >
          <Phone size={20} />
          <span className="text-sm">Phone</span>
        </button>

        <button
          className="flex items-center gap-4 text-neutral-100 hover:text-neutral-400 transition cursor-pointer"
          onClick={() => {
            window.open("https://stevenplus.itch.io/", "_blank");
            setDrawerOpen(false);
          }}
        >
          <Gamepad size={20} />
          <span className="text-sm">itch.io</span>
        </button>

        <button
          className="flex items-center gap-4 text-neutral-100 hover:text-neutral-400 transition cursor-pointer"
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/teck-xun-t-990149116/",
              "_blank",
            );
            setDrawerOpen(false);
          }}
        >
          <Linkedin size={20} />
          <span className="text-sm">LinkedIn</span>
        </button>

        <button
          className="flex items-center gap-4 text-neutral-100 hover:text-neutral-400 transition cursor-pointer"
          onClick={() => {
            window.open("https://github.com/steven-appdev", "_blank");
            setDrawerOpen(false);
          }}
        >
          <Github size={20} />
          <span className="text-sm">GitHub</span>
        </button>
      </div>
    </>
  );
}
