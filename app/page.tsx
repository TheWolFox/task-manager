import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { TaskManager } from "./components/tasks/manager";
import {
  getQueryClient,
  trpc,
} from "@/server/trpcServer";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.query(
    trpc.task.getAll.queryOptions(),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskManager />
    </HydrationBoundary>
  );
}
