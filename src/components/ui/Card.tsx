'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export function Card({
  children,
  hoverable = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100
        transition-all duration-300
        ${hoverable ? 'hover:shadow-lg hover:border-gray-200 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
