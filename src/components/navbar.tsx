"use client"

import { Gamepad, Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Navbar() {
  // const pathname = usePathname();
  return (
    <div className="sticky top-0 z-50 flex justify-between px-16 py-9 bg-black text-white">
      <div>
        <p className="text-lg font-semibold">Steven&apos;s Portfolio</p>
      </div>
      <div className="flex flex-row gap-16">
        <button
            className="cursor-pointer"
            onClick={() =>
              (window.location.href = "mailto:steven-appdev@outlook.com")
            }
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
              className="text-neutral-100 hover:text-neutral-400 transition duration-100 ease-in-out"
              size={30}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => window.open("https://stevenplus.itch.io/", "_blank")}
          >
            <Gamepad
              className="text-neutral-100 hover:text-neutral-400 transition duration-100 ease-in-out"
              size={30}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/teck-xun-t-990149116/",
                "_blank"
              )
            }
          >
            <Linkedin
              className="text-neutral-100 hover:text-neutral-400 transition duration-100 ease-in-out"
              size={30}
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
              size={30}
            />
          </button>
      </div>
    </div>
  );
}
