
"use client";

import { useTasks } from "@/client/hooks/useTasks";
import { TaskForm } from "./form";
import { TaskList } from "./list";

export function TaskManager() {
  const {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
    deleteError,
  } = useTasks();

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Failed to load tasks: {error.message}</p>;
  }

  return (
    <main>
      <h1>Task Manager</h1>

      <TaskForm
        onSubmit={createTask}
        isSubmitting={isCreating}
      />

      {createError && (
        <p role="alert">
          Failed to create task: {createError.message}
        </p>
      )}

      <p>Total tasks: {tasks.length}</p>

      <TaskList
        tasks={tasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
      />

      {updateError && (
        <p role="alert">
          Failed to update task: {updateError.message}
        </p>
      )}

      {deleteError && (
        <p role="alert">
          Failed to delete task: {deleteError.message}
        </p>
      )}
    </main>
  );
}
