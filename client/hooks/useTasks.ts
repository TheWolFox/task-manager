"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useTRPC } from "@/client/provider";

const TASKS_PAGE_SIZE = 10;

export function useTasks() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const tasksQuery = useInfiniteQuery(
    trpc.task.getPaginated.infiniteQueryOptions(
      { limit: TASKS_PAGE_SIZE },
      {
        getNextPageParam: (lastPage) =>
          lastPage.nextCursor ?? undefined,
      },
    ),
  );

  const tasks =
    tasksQuery.data?.pages.flatMap((page) => page.items) ?? [];

  const totalCount =
    tasksQuery.data?.pages[0]?.totalCount ?? 0;

  const invalidateTasks = () =>
    queryClient.invalidateQueries(
      trpc.task.getPaginated.infiniteQueryFilter({
        limit: TASKS_PAGE_SIZE,
      }),
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
    tasks,
    totalCount,

    isInitialLoading:
      tasksQuery.isPending ||
      (tasksQuery.isFetching && !tasksQuery.isFetchedAfterMount),
    error: tasksQuery.error,

    fetchNextPage: tasksQuery.fetchNextPage,
    hasNextPage: tasksQuery.hasNextPage,
    isFetchingNextPage: tasksQuery.isFetchingNextPage,

    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,

    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
}