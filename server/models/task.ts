import { z } from "zod";

export const taskSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(1),
  description: z.string().optional(),
  createdAt: z.date(),
});

export type Task = z.infer<typeof taskSchema>;