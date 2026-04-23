"use client";

import { trpc } from "@/trpc/client";
import {
  ArrowLeftCircle,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CreateSkillModal from "./modal";
import DeleteSkillConfirmation from "./confirmation";

export default function SkillDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const utils = trpc.useUtils();

  const { data: skillData, isLoading } = trpc.technical.getAll.useQuery();
  const deleteSkillMutation = trpc.technical.delete.useMutation({
    onSuccess: () => {
      utils.technical.getAll.invalidate();
    },
  });

  return (
    <div className="min-h-full pb-9">
      <DeleteSkillConfirmation
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (deleteId) {
            setDeleteModalOpen(false);
            deleteSkillMutation.mutate({
              id: deleteId,
            });
          }
        }}
      />
      <CreateSkillModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditId(null);
        }}
        id={editId}
      />
      <div className="px-5 sm:px-16 lg:px-36 pb-8 pt-5 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-5">
          <Link href="/admin/dashboard">
            <ArrowLeftCircle className="w-7 h-7 text-white cursor-pointer" />
          </Link>
          <p className="text-white">Skills</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 hover:bg-white/20 border-2 border-white/50 rounded-lg text-white transition-all flex flex-row items-center justify-center cursor-pointer"
        >
          <PlusIcon className="w-4 h-4 sm:mr-2" />
          <p className="hidden sm:block">Add New Skill</p>
        </button>
      </div>

      {/* Loading spinner */}
      {isLoading && (
        <div className="flex flex-row items-center justify-center gap-2 text-white pt-8">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </div>
      )}

      {/* Mobile card layout */}
      {!isLoading && (
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-16 pb-28 flex flex-col gap-4">
          {skillData?.map((skill) => (
            <div
              key={skill.id}
              className="bg-neutral-800/40 rounded-lg p-4 flex flex-row items-center gap-4 border border-neutral-700"
            >
              {skill.imgSrc && (
                <img
                  src={skill.imgSrc}
                  alt={skill.skill}
                  className="w-10 h-10 object-contain shrink-0"
                />
              )}
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <p className="text-white font-semibold">{skill.skill}</p>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <span className="text-xs text-neutral-400">
                  {skill.proficiency}%
                </span>
              </div>
              <div className="flex flex-row gap-3 shrink-0">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {
                    setEditId(skill.id);
                    setIsModalOpen(true);
                  }}
                >
                  <PencilIcon className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {
                    setDeleteId(skill.id);
                    setDeleteModalOpen(true);
                  }}
                >
                  <Trash2Icon className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop table layout */}
      {!isLoading && (
        <div className="hidden lg:block px-4 mx-4 sm:mx-16 lg:mx-32 sm:px-6 py-9 mb-28 bg-neutral-800/30 rounded-lg overflow-hidden">
          <table className="text-white p-4 w-full">
            <thead className="border-t border-b border-neutral-600">
              <tr>
                <th className="p-4 text-left">Icon</th>
                <th className="p-4 text-left">Skill</th>
                <th className="p-4 text-left">Proficiency</th>
                <th className="p-4 text-left" />
              </tr>
            </thead>
            <tbody>
              {skillData?.map((skill) => (
                <tr key={skill.id} className="border-b border-neutral-700">
                  <td className="p-4">
                    {skill.imgSrc && (
                      <div className="relative w-8 h-8">
                        <img
                          src={skill.imgSrc}
                          alt={skill.skill}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-bold">{skill.skill}</td>
                  <td className="p-4">
                    <div className="w-full bg-neutral-700 rounded-full h-2.5 max-w-[100px]">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-400 mt-1 block">
                      {skill.proficiency}%
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-row">
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                          setEditId(skill.id);
                          setIsModalOpen(true);
                        }}
                      >
                        <PencilIcon className="w-5 h-5 text-white" />
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer ml-4"
                        onClick={() => {
                          setDeleteId(skill.id);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <Trash2Icon className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
