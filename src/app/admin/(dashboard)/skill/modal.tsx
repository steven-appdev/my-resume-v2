"use client";

import { technicalSchema } from "@/server/schema";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateSkillModalProps {
  id?: number | null;
  isOpen: boolean;
  onClose: () => void;
}

type SkillFormData = z.infer<typeof technicalSchema>;

export default function CreateSkillModal({
  isOpen,
  onClose,
  id,
}: CreateSkillModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(technicalSchema),
    defaultValues: {
      skill: "",
      proficiency: 0,
      imgSrc: "",
    },
  });

  const utils = trpc.useUtils();
  const isEditMode = !!id;

  const { data: skillData } = trpc.technical.getById.useQuery(
    { id: id as number },
    { enabled: isEditMode && !!id },
  );

  const createSkill = trpc.technical.create.useMutation({
    onSuccess: () => {
      utils.technical.getAll.invalidate();
      onClose();
    },
  });

  const updateSkill = trpc.technical.update.useMutation({
    onSuccess: () => {
      utils.technical.getAll.invalidate();
      onClose();
    },
  });

  useEffect(() => {
    if (isEditMode && skillData) {
      setValue("skill", skillData.skill);
      setValue("proficiency", skillData.proficiency);
      setValue("imgSrc", skillData.imgSrc || "");
    }
  }, [isEditMode, skillData, setValue]);

  const onSubmit = (data: SkillFormData) => {
    if (isEditMode && id) {
      updateSkill.mutate({
        id: id,
        skill: data.skill,
        proficiency: data.proficiency,
        imgSrc: data.imgSrc || undefined,
      });
    } else {
      createSkill.mutate({
        skill: data.skill,
        proficiency: data.proficiency,
        imgSrc: data.imgSrc || undefined,
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
              {isEditMode ? "Edit Skill" : "Add Skill"}
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
                Skill Name
              </label>
              <input
                type="text"
                {...register("skill")}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.skill && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.skill.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Proficiency (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                {...register("proficiency", { valueAsNumber: true })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.proficiency && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.proficiency.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Image/Icon URL (Optional)
              </label>
              <input
                type="text"
                {...register("imgSrc")}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                disabled={createSkill.isPending || updateSkill.isPending}
                className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {createSkill.isPending || updateSkill.isPending
                  ? "Saving..."
                  : isEditMode
                    ? "Update Skill"
                    : "Save Skill"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
