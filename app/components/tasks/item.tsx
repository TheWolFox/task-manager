"use client";

import { useState, type SubmitEvent } from "react";
import type { Task } from "@/server/models/task";
import { Button } from "../shared/button";
import { TextInput } from "../shared/textInput";
import { TextArea } from "../shared/textArea";

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
  const [description, setDescription] = useState(task.description ?? "");

  function handleUpdate(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    try {
      onUpdate({
        id: task.id,
        title: trimmedTitle,
        description: description.trim() || undefined,
      });

      setIsEditing(false);
    } catch {
      // Keep the edit form open so the user can try again.
    }
  }

  function handleCancel() {
    setTitle(task.title);
    setDescription(task.description ?? "");
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="task-card task-card-editing">
        <form className="task-edit-form" onSubmit={handleUpdate}>
          <h3 className="task-edit-heading">EDIT TASK</h3>

          <div>
            <label>Title</label>
            <TextInput 
              value={title}
              onChange={setTitle}
              required
            />
          </div>

          <div>
            <label >Description</label>
            <TextArea 
              value={description}
              onChange={setDescription}
              placeholderText="Add a description (optional)..."
              rows={2}
            />
          </div>

          <div className="task-edit-actions">
            <Button 
              title="Cancel"
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              variant="secondary"
            />

            <Button 
              title={isUpdating ? "Saving..." : "Save changes"}
              type="submit"
              disabled={isUpdating || !title.trim()}
            />
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="task-card">
      <span className="task-checkbox" aria-hidden="true" />

      <div className="task-content">
        <h2 className="task-title">{task.title}</h2>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      <div className="task-actions">
        <Button 
          variant="icon"
          imgSrc="/icons/edit.png"
          disabled={isDeleting}
          onClick={() => setIsEditing(true)}
        />

        <Button 
          variant="icon"
          imgSrc="/icons/trash.png"
          disabled={isDeleting}
          onClick={() => onDelete({ id: task.id })}
        />
      </div>
    </li>
  );
}
