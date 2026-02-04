import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const technicalRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.technical.findMany({
      orderBy: { proficiency: "desc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.technical.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        skill: z.string(),
        proficiency: z.number().min(0).max(100),
        imgSrc: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.technical.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        skill: z.string().optional(),
        proficiency: z.number().min(0).max(100).optional(),
        imgSrc: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.technical.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.technical.delete({
        where: { id: input.id },
      });
    }),

  test: publicProcedure
    .meta({ openapi: { method: "GET", path: "/technical/test" } })
    .query(async () => {
      return { message: "Technical router is working!" };
    }),
});
