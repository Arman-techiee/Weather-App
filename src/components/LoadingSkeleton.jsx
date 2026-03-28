import React from 'react'

const Bone = ({ className = '' }) => (
  <div className={`shimmer rounded-lg ${className}`} />
)

const LoadingSkeleton = () => (
  <div className="flex flex-col gap-4 animate-fade-in">
    {/* Hero */}
    <div className="glass-card p-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-3">
          <Bone className="h-8 w-48" />
          <Bone className="h-3 w-32" />
          <Bone className="h-20 w-36 mt-2" />
          <Bone className="h-4 w-40" />
        </div>
        <div className="flex flex-col items-end gap-4">
          <Bone className="h-24 w-24 rounded-full" />
          <div className="flex gap-3">
            <Bone className="h-16 w-20" />
            <Bone className="h-16 w-20" />
            <Bone className="h-16 w-20" />
          </div>
        </div>
      </div>
    </div>

    {/* Metrics */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="glass-card p-5 flex flex-col gap-3">
          <Bone className="h-3 w-20" />
          <Bone className="h-7 w-28" />
          <Bone className="h-1.5 w-full" />
        </div>
      ))}
    </div>

    {/* Hourly */}
    <div className="glass-card p-5">
      <Bone className="h-5 w-36 mb-4" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 shrink-0">
            <Bone className="h-3 w-10" />
            <Bone className="h-8 w-8 rounded-full" />
            <Bone className="h-12 w-1.5" />
            <Bone className="h-4 w-8" />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default LoadingSkeleton
