"use client";

import { useEffect, useRef } from "react";

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
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
};

export function TaskList({
  tasks,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: TaskListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);
  
  return (
    <>
      <ul className="task-list">
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

      <div ref={loadMoreRef} className="tasks-load-more">
        {isFetchingNextPage && <p>Loading more tasks...</p>}
        {!hasNextPage && <p>You have reached the end of the list.</p>}
      </div>
    </>
  );
}