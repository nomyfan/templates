import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "@/backend/api";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.SERVER_BASE_URL as string,
    }),
  ],
});

export * from "./client";
