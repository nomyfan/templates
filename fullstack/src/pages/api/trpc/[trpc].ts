import * as trpcNext from "@trpc/server/adapters/next";
import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

import { appRouter } from "@/backend/api";

const nextApiHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  middleware: cors(),
  createContext: () => ({}),
  onError: () => {},
});

// eslint-disable-next-line import/no-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return nextApiHandler(req, res);
}
