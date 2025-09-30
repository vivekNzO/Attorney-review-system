import React from "react";

const ClientProfileSkeleton = () => {
  return (
    <div className="min-h-[calc(100vh-84px)] px-20 py-10 animate-pulse space-y-6">
      {/* client info skeleton */}
      <div className="flex items-center gap-4 bg-white shadow rounded-xl p-6 justify-between">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-300" />
          <div className="flex flex-col justify-center gap-2">
            <div className="h-6 w-40 bg-gray-300 rounded" />
            <div className="h-4 w-60 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="w-32 h-10 bg-gray-300 rounded-full" />
      </div>

      {/* summary skeleton */}
      <div className="bg-gray-500 p-6 rounded-xl shadow space-y-4">
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="grid grid-cols-2 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between bg-gray-300 h-10 rounded-md" />
          ))}
        </div>
      </div>

      {/* reviews skeleton */}
      <div>
        <div className="h-6 w-84 bg-gray-300 rounded mb-4" />
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full bg-gray-300 rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gray-400" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 bg-gray-400 rounded" />
                  <div className="h-3 w-40 bg-gray-300 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-3 w-full bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientProfileSkeleton;
