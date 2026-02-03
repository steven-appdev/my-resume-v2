"use client";

import { projectSchema } from "@/server/schema";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateProjectModalProps {
  id?: number | null;
  isOpen: boolean;
  onClose: () => void;
}

type ProjectFormData = z.infer<typeof projectSchema>;

export default function CreateProjectModal({
  isOpen,
  onClose,
  id,
}: CreateProjectModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      url: "",
      urlDisplayText: "",
    },
  });

  const utils = trpc.useUtils();
  const isEditMode = !!id;

  const { data: projectData } = trpc.project.getById.useQuery(
    { id: id as number },
    { enabled: isEditMode && !!id },
  );

  const createProject = trpc.project.create.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate();
      onClose();
    },
  });

  const updateProject = trpc.project.update.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate();
      onClose();
    },
  });

  useEffect(() => {
    if (isEditMode && projectData) {
      setValue("title", projectData.title);
      setValue("description", projectData.description);
      setValue("tags", projectData.tags.join(", "));
      setValue("url", projectData.url || "");
      setValue("urlDisplayText", projectData.urlDisplayText || "");
    }
  }, [isEditMode, projectData, setValue]);

  const onSubmit = (data: ProjectFormData) => {
    const tagsArray = data.tags
      ? data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    if (isEditMode && id) {
      updateProject.mutate({
        id: id,
        title: data.title,
        description: data.description,
        tags: tagsArray,
        url: data.url || undefined,
        urlDisplayText: data.urlDisplayText || undefined,
      });
    } else {
      createProject.mutate({
        title: data.title,
        description: data.description,
        tags: tagsArray,
        url: data.url || undefined,
        urlDisplayText: data.urlDisplayText || undefined,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {isEditMode ? "Edit Project" : "Add Project"}
            </h2>
            <button
              onClick={() => {
                reset();
                onClose();
              }}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Title
              </label>
              <input
                type="text"
                {...register("title")}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                {...register("tags")}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, TypeScript, Tailwind"
              />
              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tags.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  URL (Optional)
                </label>
                <input
                  type="text"
                  {...register("url")}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  URL Display Text (Optional)
                </label>
                <input
                  type="text"
                  {...register("urlDisplayText")}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  onClose();
                }}
                className="mr-3 px-4 py-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createProject.isPending || updateProject.isPending}
                className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {createProject.isPending || updateProject.isPending
                  ? "Saving..."
                  : isEditMode
                    ? "Update Project"
                    : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
