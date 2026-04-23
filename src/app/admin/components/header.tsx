"use client";

import { Settings, LogOutIcon } from "lucide-react";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="pt-4 sm:pt-8">
      <div className="mx-auto px-4 sm:px-16 lg:px-36 pb-4 sm:pb-7 border-b border-neutral-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">
                Admin CMS Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400">
                Welcome back, Steven
              </p>
            </div>
          </div>
          <motion.button
            onClick={handleSignOut}
            className="px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <LogOutIcon className="w-4 h-4" />
            <p className="hidden sm:block">Sign Out</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
