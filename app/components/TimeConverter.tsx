"use client"

import React, { useState } from 'react'
import LocationTimeSelector from './LocationTimeSelector'

export default function TimeConverter() {
  const [sourceLocation, setSourceLocation] = useState('')
  const [sourceTime, setSourceTime] = useState('')
  const [targetLocation, setTargetLocation] = useState('')
  const [targetTime, setTargetTime] = useState('')

  const handleSourceLocationChange = (location: string) => {
    setSourceLocation(location)
    // TODO: Calculate and update target time when API is integrated
  }

  const handleSourceTimeChange = (time: string) => {
    setSourceTime(time)
    // TODO: Calculate and update target time when API is integrated
  }

  const handleTargetLocationChange = (location: string) => {
    setTargetLocation(location)
    // TODO: Calculate and update target time when API is integrated
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      {/* Source Location and Time */}
      <div className="relative">
        <div className="absolute -top-4 left-6 bg-white px-3">
          <span className="text-lg font-semibold text-slate-900">From</span>
        </div>
        <LocationTimeSelector
          title="From"
          onLocationChange={handleSourceLocationChange}
          onTimeChange={handleSourceTimeChange}
          defaultLocation={sourceLocation}
          defaultTime={sourceTime}
        />
      </div>

      {/* Arrow indicator */}
      <div className="flex justify-center">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Target Location and Time (Read-only time) */}
      <div className="relative">
        <div className="absolute -top-4 left-6 bg-white px-3">
          <span className="text-lg font-semibold text-slate-900">To</span>
        </div>
        <LocationTimeSelector
          title="To"
          onLocationChange={handleTargetLocationChange}
          onTimeChange={() => {}} // No-op for read-only
          isReadOnly={true}
          defaultLocation={targetLocation}
          defaultTime={targetTime}
        />
      </div>
    </div>
  )
} 