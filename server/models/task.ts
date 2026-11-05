import { z } from "zod";

export const taskSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(1),
  description: z.string().optional(),
  createdAt: z.date(),
});

export const createTaskInputSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().optional(),
});

export const updateTaskInputSchema = z
  .object({
    id: z.uuid(),
    title: z.string().trim().min(1).optional(),
    description: z.string().optional(),
  })
  .refine(
    (input) =>
      input.title !== undefined ||
      input.description !== undefined,
    {
      message: "At least one field must be provided for update.",
    },
  );

export const taskIdSchema = z.object({
  id: z.uuid(),
});

export const paginatedTasksInputSchema = z.object({
  limit: z.number().int().min(1).max(50),
  cursor: z.number().int().min(0).nullish(),
});

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;
export type PaginatedTasksInput = z.infer<typeof paginatedTasksInputSchema>;
