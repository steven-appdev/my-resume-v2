"use client";

import { experienceSchema } from "@/server/schema";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateExperienceModalProps {
  id?: number | null;
  isOpen: boolean;
  onClose: () => void;
}

type ExperienceFormData = z.infer<typeof experienceSchema>;

export default function CreateExperienceModal({
  isOpen,
  onClose,
  id,
}: CreateExperienceModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const utils = trpc.useUtils();
  const isEditMode = !!id;

  const { data: experienceData } = trpc.experience.getById.useQuery(
    { id: id as number },
    { enabled: isEditMode && !!id },
  );

  const createExperience = trpc.experience.create.useMutation({
    onSuccess: () => {
      utils.experience.getAll.invalidate();
      onClose();
    },
  });

  const updateExperience = trpc.experience.update.useMutation({
    onSuccess: () => {
      utils.experience.getAll.invalidate();
      onClose();
    },
  });

  useEffect(() => {
    if (isEditMode && experienceData) {
      setValue("company", experienceData.company);
      setValue("position", experienceData.position);
      setValue("location", experienceData.location);
      setValue(
        "startDate",
        experienceData.startDate
          ? new Date(experienceData.startDate).toISOString().split("T")[0]
          : "",
      );
      setValue(
        "endDate",
        experienceData.endDate
          ? new Date(experienceData.endDate).toISOString().split("T")[0]
          : "",
      );
      setValue("description", experienceData.description);
    }
  }, [isEditMode, experienceData]);

  const onSubmit = (data: ExperienceFormData) => {
    if (isEditMode) {
      updateExperience.mutate({
        id: id,
        ...data,
        endDate: data.endDate || null,
      });
    } else {
      createExperience.mutate({
        ...data,
        endDate: data.endDate || null,
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
              {isEditMode ? "Edit Experience" : "Add Experience"}
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
                Company
              </label>
              <input
                type="text"
                {...register("company")}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Position
              </label>
              <input
                type="text"
                {...register("position")}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register("startDate")}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  {...register("endDate")}
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
                disabled={
                  createExperience.isPending || updateExperience.isPending
                }
                className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {createExperience.isPending || updateExperience.isPending
                  ? "Saving..."
                  : isEditMode
                    ? "Update Experience"
                    : "Save Experience"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
