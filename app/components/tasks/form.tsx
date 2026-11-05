"use client";

import { useState, type SubmitEvent } from "react";
import { TextInput } from "../shared/textInput";
import { TextArea } from "../shared/textArea";
import { Button } from "../shared/button";

type TaskFormProps = {
  onSubmit: (input: { title: string; description?: string }) => void;
  isSubmitting: boolean;
};

export function TaskForm({ onSubmit, isSubmitting }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    try {
      onSubmit({
        title: trimmedTitle,
        description: description.trim() || undefined,
      });

      setTitle("");
      setDescription("");
    } catch {
      // Keep the entered values so the user can try again.
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-main">
        <TextInput
          value={title}
          onChange={setTitle}
          placeholderText="Add a new task..."
          required
        />

        <Button
          title={isSubmitting ? "Adding..." : "Add"}
          type="submit"
          disabled={isSubmitting || !title.trim()}
        />
      </div>

      <TextArea
        placeholderText="Add a description (optional)..."
        value={description}
        onChange={setDescription}
        rows={2}
      />
    </form>
  );
}
