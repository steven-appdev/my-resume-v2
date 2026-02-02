import { createTRPCRouter, publicProcedure } from "../trpc";

export const experienceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.experience.findMany({
      orderBy: { startDate: "desc" },
    });
  }),
});
