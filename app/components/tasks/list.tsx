
"use client";

import type { Task } from "@/server/models/task";

import { TaskItem } from "./item";

type TaskListProps = {
  tasks: Task[];
  onUpdate: (input: {
    id: string;
    title?: string;
    description?: string;
  }) => void;
  onDelete: (input: { id: string }) => void;
  isUpdating: boolean;
  isDeleting: boolean;
};

export function TaskList({
  tasks,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}
    </ul>
  );
}
