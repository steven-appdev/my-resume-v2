import { httpBatchLink } from "@trpc/client";
import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "@/server/root";
import superjson from "superjson";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NETLIFY_URL) return `https://${process.env.NETLIFY_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const serverClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
    }),
  ],
});
