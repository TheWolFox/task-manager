import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../repositories/taskRepository";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return getAllTasks();
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().trim().min(1),
        description: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      return createTask(input);
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.uuid(),
        title: z.string().trim().min(1).optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      const { id, ...updates } = input;

      return updateTask(id, updates);
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.uuid(),
      }),
    )
    .mutation(({ input }) => {
      return deleteTask(input.id);
    }),
});
