"use client";

import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useTRPC } from "@/client/provider";

export function TaskTest() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const tasksQuery = useQuery(
    trpc.task.getAll.queryOptions(),
  );

  const invalidateTasks = () =>
    queryClient.invalidateQueries(
      trpc.task.getAll.queryFilter(),
    );

  const createTaskMutation = useMutation(
    trpc.task.create.mutationOptions({
      onSuccess: () => {
        setTitle("");
        setDescription("");
        invalidateTasks();
      },
    }),
  );

  const updateTaskMutation = useMutation(
    trpc.task.update.mutationOptions({
      onSuccess: () => {
        setEditingTaskId(null);
        invalidateTasks();
      },
    }),
  );

  const deleteTaskMutation = useMutation(
    trpc.task.delete.mutationOptions({
      onSuccess: () => {
        invalidateTasks();
      },
    }),
  );

  function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createTaskMutation.mutate({
      title,
      description: description || undefined,
    });
  }

  function handleUpdateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingTaskId) return;

    updateTaskMutation.mutate({
      id: editingTaskId,
      title: editingTitle,
      description: editingDescription,
    });
  }

  function startEditing(task: {
    id: string;
    title: string;
    description?: string;
  }) {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingDescription(task.description ?? "");
  }

  function handleDeleteTask(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (confirmed) {
      deleteTaskMutation.mutate({ id });
    }
  }

  if (tasksQuery.isPending) {
    return <p>Loading tasks...</p>;
  }

  if (tasksQuery.error) {
    return <p>Error: {tasksQuery.error.message}</p>;
  }

  return (
    <main>
      <h1>Task Manager</h1>

      <section>
        <h2>Create task</h2>

        <form onSubmit={handleCreateTask}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={createTaskMutation.isPending}
          >
            {createTaskMutation.isPending
              ? "Creating..."
              : "Create task"}
          </button>
        </form>

        {createTaskMutation.error && (
          <p>Error: {createTaskMutation.error.message}</p>
        )}
      </section>

      <section>
        <h2>Tasks ({tasksQuery.data.length})</h2>

        {tasksQuery.data.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul>
            {tasksQuery.data.map((task) => (
              <li key={task.id}>
                {editingTaskId === task.id ? (
                  <form onSubmit={handleUpdateTask}>
                    <div>
                      <label htmlFor={`edit-title-${task.id}`}>
                        Title
                      </label>
                      <input
                        id={`edit-title-${task.id}`}
                        value={editingTitle}
                        onChange={(event) =>
                          setEditingTitle(event.target.value)
                        }
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor={`edit-description-${task.id}`}>
                        Description
                      </label>
                      <textarea
                        id={`edit-description-${task.id}`}
                        value={editingDescription}
                        onChange={(event) =>
                          setEditingDescription(event.target.value)
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={updateTaskMutation.isPending}
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingTaskId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h3>{task.title}</h3>

                    <p>{task.description || "No description"}</p>

                    <small>
                      Created at: {task.createdAt.toLocaleString()}
                    </small>

                    <div>
                      <button onClick={() => startEditing(task)}>
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        disabled={deleteTaskMutation.isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {updateTaskMutation.error && (
          <p>Error: {updateTaskMutation.error.message}</p>
        )}

        {deleteTaskMutation.error && (
          <p>Error: {deleteTaskMutation.error.message}</p>
        )}
      </section>
    </main>
  );
}
