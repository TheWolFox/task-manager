"use client";

import { useEffect, useRef } from "react";

type NotificationProps = {
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export function Notification({ type, message, onClose }: NotificationProps) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => onCloseRef.current(), 5_000);

    return () => window.clearTimeout(timeoutId);
  }, [message]);

  return (
    <div
      className={`notification notification-${type}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <p>{message}</p>
      <button
        className="notification-close"
        type="button"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
