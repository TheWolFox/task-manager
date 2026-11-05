"use client";

import { useTasks } from "@/client/hooks/useTasks";
import { TaskForm } from "./form";
import { TaskList } from "./list";
import { Header } from "../layout/header";

export function TaskManager() {
  const {
    tasks,
    isInitialLoading,
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

  return (
    <main className="app-shell">
      <Header />
      <section className="clipboard">
        <div className="clipboard-clip" />

        <div className="clipboard-paper">
          {isInitialLoading ? (
            <p>Loading tasks...</p>
          ) : error ? (
            <p role="alert">Failed to load tasks: {error.message}</p>
          ) : (
            <>
              <TaskForm onSubmit={createTask} isSubmitting={isCreating} />

              {createError && (
                <p role="alert">Failed to create task: {createError.message}</p>
              )}

              <hr className="tasks-divider" />

              <p className="total-tasks"> Total Tasks: {tasks.length}</p>

              <TaskList
                tasks={tasks}
                onUpdate={updateTask}
                onDelete={deleteTask}
                isUpdating={isUpdating}
                isDeleting={isDeleting}
              />

              {updateError && (
                <p role="alert">Failed to update task: {updateError.message}</p>
              )}

              {deleteError && (
                <p role="alert">Failed to delete task: {deleteError.message}</p>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
