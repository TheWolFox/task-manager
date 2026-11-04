import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { headers } from "next/headers";
import { cache } from "react";

import { makeQueryClient } from "@/client/queryClient";

import { createTRPCContext } from "./trpc";
import { appRouter } from "./routers/_app";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  router: appRouter,
  ctx: async () =>
    createTRPCContext({
      headers: await headers(),
    }),
  queryClient: getQueryClient,
});
