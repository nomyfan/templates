import { z } from "zod";

export const createPersonSchema = z.object({
  username: z.string().min(1).max(50),
  display_name: z.string().min(1).max(100),
});
