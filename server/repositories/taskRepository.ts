import "server-only";

import { randomUUID } from "node:crypto";

import type { Task } from "../models/task";

const tasks = new Map<string, Task>();

export function getAllTasks(): Task[] {
  return Array.from(tasks.values());
}

export function createTask(input: {
  title: string;
  description?: string;
}): Task {
  const task: Task = {
    id: randomUUID(),
    title: input.title,
    description: input.description,
    createdAt: new Date(),
  };

  tasks.set(task.id, task);

  return task;
}

export function updateTask(
  id: string,
  input: {
    title?: string;
    description?: string;
  },
): Task | null {
  const existingTask = tasks.get(id);

  if (!existingTask) {
    return null;
  }

  const updatedTask: Task = {
    ...existingTask,
    ...input,
  };

  tasks.set(id, updatedTask);

  return updatedTask;
}

export function deleteTask(id: string): boolean {
  return tasks.delete(id);
}