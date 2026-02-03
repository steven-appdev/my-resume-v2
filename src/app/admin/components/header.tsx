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
    <div className="pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-7 border-b border-neutral-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Admin CMS Dashboard
              </h1>
              <p className="text-sm text-neutral-400">Welcome back, Steven</p>
            </div>
          </div>
          <motion.button
            onClick={handleSignOut}
            className="px-4 py-2 border-2 border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <LogOutIcon className="w-4 h-4" />
            <p className="hidden sm:block">Sign Out</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
