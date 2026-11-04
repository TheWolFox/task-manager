import {
  createTaskInputSchema,
  updateTaskInputSchema,
  taskIdSchema,
} from "../models/task";

import { createTRPCRouter, publicProcedure } from "../trpc";

import { TRPCError } from "@trpc/server";

import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../repositories/task";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return getAllTasks();
  }),

  create: publicProcedure.input(createTaskInputSchema).mutation(({ input }) => {
    return createTask(input);
  }),

  update: publicProcedure.input(updateTaskInputSchema).mutation(({ input }) => {
    const { id, ...updates } = input;

    const updatedTask = updateTask(id, updates);

    if (!updatedTask) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Task not found.",
      });
    }

    return updatedTask;
  }),

  delete: publicProcedure.input(taskIdSchema).mutation(({ input }) => {
    const deleted = deleteTask(input.id);

    if (!deleted) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Task not found.",
      });
    }

    return deleted;
  }),
});
