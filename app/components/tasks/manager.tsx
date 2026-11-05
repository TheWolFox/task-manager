"use client";

import { useRef, useState } from "react";
import { useTasks } from "@/client/hooks/useTasks";
import { TaskForm } from "./form";
import { TaskList } from "./list";
import { Header } from "../layout/header";
import { Notification } from "../shared/notification";

type NotificationState = {
  id: number;
  type: "success" | "error";
  message: string;
};

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
  } = useTasks();
  const [notifications, setNotifications] = useState<NotificationState[]>([]);
  const nextNotificationId = useRef(0);

  function addNotification(notification: Omit<NotificationState, "id">) {
    const id = nextNotificationId.current++;
    setNotifications((current) => [...current, { ...notification, id }]);
  }

  function closeNotification(id: number) {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  }

  function handleCreateTask(input: { title: string; description?: string }) {
    try {
      createTask(input);
      addNotification({ type: "success", message: "Task created successfully." });
    } catch (mutationError) {
      addNotification({
        type: "error",
        message: mutationError instanceof Error ? mutationError.message : "Failed to create task.",
      });
      throw mutationError;
    }
  }

  function handleUpdateTask(input: { id: string; title?: string; description?: string }) {
    try {
      updateTask(input);
      addNotification({ type: "success", message: "Task updated successfully." });
    } catch (mutationError) {
      addNotification({
        type: "error",
        message: mutationError instanceof Error ? mutationError.message : "Failed to update task.",
      });
      throw mutationError;
    }
  }

  function handleDeleteTask(input: { id: string }) {
    try {
      deleteTask(input);
      addNotification({ type: "success", message: "Task deleted successfully." });
    } catch (mutationError) {
      addNotification({
        type: "error",
        message: mutationError instanceof Error ? mutationError.message : "Failed to delete task.",
      });
    }
  }

  return (
    <main className="app-shell">
      <div className="notification-container" aria-label="Notifications">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => closeNotification(notification.id)}
          />
        ))}
      </div>

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
              <TaskForm onSubmit={handleCreateTask} isSubmitting={isCreating} />
              <hr className="tasks-divider" />
              <p className="total-tasks"> Total Tasks: {tasks.length}</p>

              <TaskList
                tasks={tasks}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                isUpdating={isUpdating}
                isDeleting={isDeleting}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
