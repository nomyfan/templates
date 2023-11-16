import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";

import * as personRepo from "../repository/person.repo";

import { ServerError } from "@/backend/error";
import * as apiSchema from "@/shared/api-schema";

const t = initTRPC.create({
  errorFormatter: (opts) => {
    const cause = opts.error.cause;
    if (cause instanceof ServerError) {
      return {
        code: cause.code,
        message: cause.message,
        // We can assign error context as data.
        data: {
          ...opts.shape.data,
        },
      };
    }

    return opts.shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const appRouter = router({
  listPeople: publicProcedure.query(async () => {
    return await personRepo.listPeople();
  }),
  createPerson: publicProcedure
    .input(apiSchema.createPersonSchema)
    .mutation(async ({ input }) => {
      return await personRepo.createPerson(input);
    }),
  deletePerson: publicProcedure
    .input(z.number().int().positive())
    .mutation(async ({ input: id }) => {
      await personRepo.deletePersonById(id);
    }),
  error: publicProcedure
    .input(z.number().int().positive())
    .query(async ({ input }) => {
      const error = new ServerError({
        code: -1,
        message: "oops...",
        context: input,
      });
      throw new TRPCError({
        message: error.message,
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
      });
    }),
});

export type AppRouter = typeof appRouter;
