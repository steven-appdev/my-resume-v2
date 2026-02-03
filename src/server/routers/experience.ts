import { get } from "http";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const experienceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.experience.findMany({
      orderBy: { startDate: "asc" },
    });
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.experience.findUnique({
        where: { id: input.id },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        position: z.string(),
        company: z.string(),
        location: z.string(),
        startDate: z.string(),
        endDate: z.string().optional().nullable(),
        description: z.string(),
        tags: z.array(z.string()).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.create({
        data: {
          position: input.position,
          company: input.company,
          location: input.location,
          startDate: new Date(input.startDate),
          endDate: input.endDate ? new Date(input.endDate) : null,
          description: input.description,
          tags: input.tags,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        position: z.string(),
        company: z.string(),
        location: z.string(),
        startDate: z.string(),
        endDate: z.string().optional().nullable(),
        description: z.string(),
        tags: z.array(z.string()).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.update({
        where: { id: input.id },
        data: {
          position: input.position,
          company: input.company,
          location: input.location,
          startDate: new Date(input.startDate),
          endDate: input.endDate ? new Date(input.endDate) : null,
          description: input.description,
          tags: input.tags,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.delete({
        where: { id: input.id },
      });
    }),
});
