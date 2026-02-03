"use client";

import { experienceSchema } from "@/server/schema";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ExperienceData {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
  tags: string[];
}

interface DeleteExperienceConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

type ExperienceFormData = z.infer<typeof experienceSchema>;

export default function DeleteExperienceConfirmation({
  isOpen,
  onClose,
  onConfirm,
}: DeleteExperienceConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Delete Experience?
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
          </div>
          <div className="flex flex-row gap-3">
            <button
              type="button"
              className="flex-1 text-black bg-white rounded-lg px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer"
              onClick={onClose}
            >
              <p>Cancel</p>
            </button>
            <button
              type="button"
              className="flex-1 text-white bg-red-800 rounded-lg px-4 py-2 hover:bg-red-900 transition-all cursor-pointer"
              onClick={onConfirm}
            >
              <p>Confirm Deletion</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
