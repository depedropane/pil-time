'use client';

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-200 rounded-2xl h-40 animate-pulse" />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}
