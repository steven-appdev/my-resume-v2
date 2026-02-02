import { createTRPCRouter } from "./trpc";
import { projectRouter } from "./routers/project";
import { technicalRouter } from "./routers/technical";
import { experienceRouter } from "./routers/experience";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  technical: technicalRouter,
  experience: experienceRouter,
});

export type AppRouter = typeof appRouter;
