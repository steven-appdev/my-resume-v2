import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex justify-between px-64 py-9 bg-black text-white">
      <div>
        <p className="text-lg font-semibold">Steven&apos;s Portfolio</p>
      </div>
      <div className="flex flex-row gap-16">
        <a
          className={`text-base font-semibold ${
            pathname === "/" && "underline underline-offset-8"
          }`}
          href="/"
        >
          Home
        </a>
        <a
          className={`text-base font-semibold ${
            pathname === "/academic" && "underline underline-offset-8"
          }`}
          href="/academic"
        >
          Academic History
        </a>
        <a
          className={`text-base font-semibold ${
            pathname === "/experience" && "underline underline-offset-8"
          }`}
          href="/experience"
        >
          Experience
        </a>
        <a
          className={`text-base font-semibold ${
            pathname === "/project" && "underline underline-offset-8"
          }`}
          href="/project"
        >
          Projects
        </a>
        <a
          className={`text-base font-semibold ${
            pathname === "/blog" && "underline underline-offset-8"
          }`}
          href="/blog"
        >
          Blog
        </a>
      </div>
    </div>
  );
}
