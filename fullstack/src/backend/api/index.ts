import { initTRPC } from "@trpc/server";
import { z } from "zod";

import * as personRepo from "../repository/person.repo";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const appRouter = router({
  listPeople: publicProcedure.query(async () => {
    return await personRepo.listPeople();
  }),
  createPerson: publicProcedure
    .input(
      z.object({
        username: z.string().min(1).max(50),
        display_name: z.string().min(1).max(100),
      }),
    )
    .mutation(async ({ input }) => {
      return await personRepo.createPerson(input);
    }),
  deletePerson: publicProcedure
    .input(z.number().int().positive())
    .mutation(async ({ input: id }) => {
      await personRepo.deletePersonById(id);
    }),
});

export type AppRouter = typeof appRouter;
