import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { db } from "./db";

// Create context
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    headers: opts.headers,
  };
};

// Initialize tRPC
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

// Export reusable router and procedure helpers
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
