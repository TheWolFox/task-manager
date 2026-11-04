
"use client";

import { useState, SubmitEvent } from "react";
import type { Task } from "@/server/models/task";

type TaskItemProps = {
  task: Task;
  onUpdate: (input: {
    id: string;
    title?: string;
    description?: string;
  }) => void;
  onDelete: (input: { id: string }) => void;
  isUpdating: boolean;
  isDeleting: boolean;
};

export function TaskItem({
  task,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description ?? "",
  );

  function handleUpdate(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onUpdate({
      id: task.id,
      title: trimmedTitle,
      description: description.trim() || undefined,
    });

    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor={`title-${task.id}`}>Title</label>
            <input
              id={`title-${task.id}`}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor={`description-${task.id}`}>
              Description
            </label>
            <textarea
              id={`description-${task.id}`}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save changes"}
          </button>

          <button
            type="button"
            onClick={() => {
              setTitle(task.title);
              setDescription(task.description ?? "");
              setIsEditing(false);
            }}
            disabled={isUpdating}
          >
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li>
      <h2>{task.title}</h2>

      {task.description && <p>{task.description}</p>}

      <p>Created at: {task.createdAt.toLocaleString()}</p>

      <button
        type="button"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => onDelete({ id: task.id })}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
}
