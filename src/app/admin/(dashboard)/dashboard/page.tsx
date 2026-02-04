"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  BadgeCheck,
  BotMessageSquare,
  BriefcaseBusiness,
  FolderGit2,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-full">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-12"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">
              Content Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Experience Card */}
              <Link href="/admin/experience">
                <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-lg shadow-xl shadow-black/50 border hover:border-blue-500/50 transition-all overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                      <BriefcaseBusiness className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Experience
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Manage professional experience entries
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projects Card */}
              <Link href="/admin/project">
                <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-lg shadow-xl shadow-black/50 border hover:border-purple-500/50 transition-all overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                      <FolderGit2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Projects
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Manage portfolio projects
                    </p>
                  </div>
                </div>
              </Link>

              {/* Skills Card */}
              <Link href="/admin/skill">
                <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-lg shadow-xl shadow-black/50 border hover:border-green-500/50 transition-all overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-teal-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                      <BadgeCheck className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Skills
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Manage technical skills
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">AI Assistant</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Experience Card */}
              <Link href="/admin/ai">
                <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-lg shadow-xl shadow-black/50 border hover:border-amber-500/50 transition-all overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-300 to-amber-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                      <BotMessageSquare className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        AI Content Assistant
                      </h3>
                      <div className="border-2 border-white rounded-lg px-2 mb-2">
                        <p className="text-white text-sm">BETA</p>
                      </div>
                    </div>

                    <p className="text-neutral-400 text-sm">
                      Generate content using AI assistance
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
