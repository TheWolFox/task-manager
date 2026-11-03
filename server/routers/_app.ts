import { createTRPCRouter, publicProcedure } from "../trpc";
import { taskRouter } from "./task";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      message: "Hello from tRPC!",
    };
  }),
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
