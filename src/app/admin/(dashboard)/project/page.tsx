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
import CreateProjectModal from "./modal";
import DeleteProjectConfirmation from "./confirmation";

export default function ProjectDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const utils = trpc.useUtils();

  const { data: projectData, isLoading } = trpc.project.getAll.useQuery();
  const deleteProjectMutation = trpc.project.delete.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate();
    },
  });

  return (
    <div className="min-h-full pb-9">
      <DeleteProjectConfirmation
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (deleteId) {
            setDeleteModalOpen(false);
            deleteProjectMutation.mutate({
              id: deleteId,
            });
          }
        }}
      />
      <CreateProjectModal
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
          <p className="text-white">Projects</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 hover:bg-white/20 border-2 border-white/50 rounded-lg text-white transition-all flex flex-row items-center justify-center cursor-pointer"
        >
          <PlusIcon className="w-4 h-4 sm:mr-2" />
          <p className="hidden sm:block">Add New Project</p>
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
          {projectData?.map((proj) => (
            <div
              key={proj.id}
              className="bg-neutral-800/40 rounded-lg p-4 flex flex-col gap-3 border border-neutral-700"
            >
              <div className="flex flex-row items-start justify-between gap-2">
                <p className="text-white font-semibold flex-1 min-w-0">
                  {proj.title}
                </p>
                <div className="flex flex-row gap-3 shrink-0">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setEditId(proj.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <PencilIcon className="w-5 h-5 text-white" />
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setDeleteId(proj.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <Trash2Icon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">
                {proj.description}
              </p>
              {proj.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-neutral-700 rounded-full text-xs text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {proj.url && (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm hover:underline self-start"
                >
                  {proj.urlDisplayText || "Link"}
                </a>
              )}
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
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Tags</th>
                <th className="p-4 text-left">URL</th>
                <th className="p-4 text-left" />
              </tr>
            </thead>
            <tbody>
              {projectData?.map((proj) => (
                <tr key={proj.id} className="border-b border-neutral-700">
                  <td className="p-4 font-bold">{proj.title}</td>
                  <td className="p-4 max-w-sm truncate">{proj.description}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-neutral-700 rounded-full text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-blue-400">
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {proj.urlDisplayText || "Link"}
                      </a>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-row">
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                          setEditId(proj.id);
                          setIsModalOpen(true);
                        }}
                      >
                        <PencilIcon className="w-5 h-5 text-white" />
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer ml-4"
                        onClick={() => {
                          setDeleteId(proj.id);
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
