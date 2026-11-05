import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { TaskManager } from "./components/tasks/manager";
import {
  getQueryClient,
  trpc,
} from "@/server/trpcServer";

const TASKS_PAGE_SIZE = 10;

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.infiniteQuery(
    trpc.task.getPaginated.infiniteQueryOptions(
      { limit: TASKS_PAGE_SIZE },
      {
        getNextPageParam: (lastPage) =>
          lastPage.nextCursor ?? undefined,
      },
    ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskManager />
    </HydrationBoundary>
  );
}