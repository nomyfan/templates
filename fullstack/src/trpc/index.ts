import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "@/backend/api";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});

export * from "./client";
