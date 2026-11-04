"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useTRPC } from "@/client/provider";

export function useTasks() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const tasksQuery = useQuery(
    trpc.task.getAll.queryOptions(),
  );

  const invalidateTasks = () =>
    queryClient.invalidateQueries(
      trpc.task.getAll.queryFilter(),
    );

  const createTaskMutation = useMutation(
    trpc.task.create.mutationOptions({
      onSuccess: invalidateTasks,
    }),
  );

  const updateTaskMutation = useMutation(
    trpc.task.update.mutationOptions({
      onSuccess: invalidateTasks,
    }),
  );

  const deleteTaskMutation = useMutation(
    trpc.task.delete.mutationOptions({
      onSuccess: invalidateTasks,
    }),
  );

  return {
    tasks: tasksQuery.data ?? [],
    isLoading: tasksQuery.isPending,
    error: tasksQuery.error,

    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,

    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,

    createError: createTaskMutation.error,
    updateError: updateTaskMutation.error,
    deleteError: deleteTaskMutation.error,
  };
}
