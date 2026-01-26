import { createTRPCRouter } from "./trpc";
import { projectRouter } from "./routers/project";
import { technicalRouter } from "./routers/technical";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  technical: technicalRouter,
});

export type AppRouter = typeof appRouter;
