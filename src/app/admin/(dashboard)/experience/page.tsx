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
import CreateExperienceModal from "./modal";
import DeleteExperienceConfirmation from "./confirmation";

export default function ExperienceDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const utils = trpc.useUtils();

  const { data: experienceData, isLoading } = trpc.experience.getAll.useQuery();
  const deleteExperienceMutation = trpc.experience.delete.useMutation({
    onSuccess: () => {
      utils.experience.getAll.invalidate();
    },
  });

  return (
    <div className="min-h-full pb-9">
      <DeleteExperienceConfirmation
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (deleteId) {
            setDeleteModalOpen(false);
            deleteExperienceMutation.mutate({
              id: deleteId,
            });
          }
        }}
      />
      <CreateExperienceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditId(null);
        }}
        id={editId}
      />
      <div className="mx-auto px-5 sm:px-16 lg:px-36 pb-8 pt-5 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-5">
          <Link href="/admin/dashboard">
            <ArrowLeftCircle className="w-7 h-7 text-white cursor-pointer" />
          </Link>
          <p className="text-white">Experiences</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 hover:bg-white/20 border-2 border-white/50 rounded-lg text-white transition-all flex flex-row items-center justify-center cursor-pointer"
        >
          <PlusIcon className="w-4 h-4 sm:mr-2" />
          <p className="hidden sm:block">Add New Experience</p>
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
          {experienceData?.map((exp) => (
            <div
              key={exp.id}
              className="bg-neutral-800/40 rounded-lg p-4 flex flex-col gap-3 border border-neutral-700"
            >
              <div className="flex flex-row items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">
                    {exp.company}
                  </p>
                  <p className="text-neutral-300 text-sm truncate">
                    {exp.position}
                  </p>
                </div>
                <div className="flex flex-row gap-3 shrink-0">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setEditId(exp.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <PencilIcon className="w-5 h-5 text-white" />
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setDeleteId(exp.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <Trash2Icon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-400">
                <span>{exp.location}</span>
                <span>
                  {exp.startDate.toLocaleDateString()} –{" "}
                  {exp.endDate ? exp.endDate.toLocaleDateString() : "Present"}
                </span>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">
                {exp.description}
              </p>
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
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Position</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Start Date</th>
                <th className="p-4 text-left">End Date</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left" />
              </tr>
            </thead>
            <tbody>
              {experienceData?.map((exp) => (
                <tr key={exp.id} className="border-b border-neutral-700">
                  <td className="p-4">{exp.company}</td>
                  <td className="p-4">{exp.position}</td>
                  <td className="p-4">{exp.location}</td>
                  <td className="p-4">{exp.startDate.toLocaleDateString()}</td>
                  <td className="p-4">
                    {exp.endDate ? exp.endDate.toLocaleDateString() : "-"}
                  </td>
                  <td className="p-4 break-words">{exp.description}</td>
                  <td className="p-4">
                    <div className="flex flex-row">
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                          setEditId(exp.id);
                          setIsModalOpen(true);
                        }}
                      >
                        <PencilIcon className="w-5 h-5 text-white" />
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer ml-4"
                        onClick={() => {
                          setDeleteId(exp.id);
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
