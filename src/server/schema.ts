import z from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1, "Required"),
  position: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  startDate: z.string().min(1, "Required"),
  endDate: z.string().optional().nullish(),
  description: z.string().min(1, "Required"),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  tags: z.string().optional(),
  urlDisplayText: z.string().optional(),
  url: z.string().optional(),
});

export const technicalSchema = z.object({
  skill: z.string().min(1, "Required"),
  proficiency: z.number().min(0).max(100),
  imgSrc: z.string().optional(),
});
