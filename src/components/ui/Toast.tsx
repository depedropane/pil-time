'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<
    Array<ToastProps & { id: number }>
  >([]);

  const showToast = (props: ToastProps) => {
    const id = toastId++;
    const newToast = { ...props, id };
    setToasts((prev) => [...prev, newToast]);

    if (props.duration !== 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, props.duration || 3000);
    }

    return id;
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
};

export function Toast({ message, type = 'info', id, onClose }: ToastProps & { id: number; onClose: () => void }) {
  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const textColors = {
    success: 'text-green-700',
    error: 'text-red-700',
    info: 'text-blue-700',
  };

  return (
    <div
      className={`
        border rounded-lg p-4 flex items-center justify-between
        ${bgColors[type]}
      `}
    >
      <span className={textColors[type]}>{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X size={18} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
