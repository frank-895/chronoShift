"use client"

import React, { useState, useEffect, useRef } from 'react'

interface LocationTimeSelectorProps {
  title: string
  onLocationChange?: (location: string) => void
  onTimeChange?: (time: string) => void
  isReadOnly?: boolean
  defaultLocation?: string
  defaultTime?: string
}

export default function LocationTimeSelector({ 
  title, 
  onLocationChange, 
  onTimeChange, 
  isReadOnly = false,
  defaultLocation = '',
  defaultTime = ''
}: LocationTimeSelectorProps) {
  const [location, setLocation] = useState(defaultLocation)
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM')
  const [showDropdown, setShowDropdown] = useState(false)
  
  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)

  // Dummy locations for now - will be replaced with API data
  const dummyLocations = [
    'New York, NY, USA',
    'London, UK',
    'Tokyo, Japan',
    'Sydney, Australia',
    'Paris, France',
    'Berlin, Germany',
    'Mumbai, India',
    'São Paulo, Brazil',
    'Cairo, Egypt',
    'Moscow, Russia',
    'Los Angeles, CA, USA',
    'Chicago, IL, USA',
    'Toronto, Canada',
    'Vancouver, Canada',
    'Mexico City, Mexico',
    'Buenos Aires, Argentina',
    'Madrid, Spain',
    'Rome, Italy',
    'Amsterdam, Netherlands',
    'Stockholm, Sweden'
  ]

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)
    setShowDropdown(value.length > 0)
    onLocationChange?.(value)
  }

  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    setPeriod(newPeriod)
    updateTime()
  }

  const validateHours = (value: string, currentHours: string): boolean => {
    if (value === '') return true
    const numValue = parseInt(value)
    if (isNaN(numValue) || numValue < 0 || numValue > 9) return false
    
    // Check if it would create an invalid hour when combined
    const combined = currentHours.charAt(0) === value ? currentHours : value + currentHours.charAt(1)
    const combinedNum = parseInt(combined)
    return combinedNum >= 1 && combinedNum <= 12
  }

  const validateMinutes = (value: string, currentMinutes: string): boolean => {
    if (value === '') return true
    const numValue = parseInt(value)
    if (isNaN(numValue) || numValue < 0 || numValue > 9) return false
    
    // Check if it would create an invalid minute when combined
    const combined = currentMinutes.charAt(0) === value ? currentMinutes : value + currentMinutes.charAt(1)
    const combinedNum = parseInt(combined)
    return combinedNum >= 0 && combinedNum <= 59
  }

  const updateTime = () => {
    if (hours && minutes) {
      let hour24 = parseInt(hours)
      if (period === 'PM' && hour24 !== 12) {
        hour24 += 12
      } else if (period === 'AM' && hour24 === 12) {
        hour24 = 0
      }
      const timeString = `${hour24.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`
      onTimeChange?.(timeString)
    } else if (hours || minutes) {
      // Handle partial input
      const timeString = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
      onTimeChange?.(timeString)
    }
  }

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation)
    setShowDropdown(false)
    onLocationChange?.(selectedLocation)
  }

  const handleLocationBlur = () => {
    setTimeout(() => setShowDropdown(false), 200)
  }

  const filteredLocations = dummyLocations.filter(loc => 
    loc.toLowerCase().includes(location.toLowerCase())
  ).slice(0, 8)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-slate-200 transition-all duration-200 hover:shadow-xl">
      {/* Location Search */}
      <div className="mb-6 relative">
        <label htmlFor={`location-${title.toLowerCase()}`} className="block text-sm font-medium text-slate-700 mb-2">
          Location
        </label>
        <div className="relative">
          <input
            type="text"
            id={`location-${title.toLowerCase()}`}
            value={location}
            onChange={handleLocationChange}
            onBlur={handleLocationBlur}
            placeholder="Search for a location..."
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              isReadOnly 
                ? 'bg-slate-50 border-slate-300 text-slate-500' 
                : 'border-slate-300 bg-white hover:border-blue-300'
            }`}
          />
          {showDropdown && filteredLocations.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredLocations.map((loc, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(loc)}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-b-0"
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Time Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Time
        </label>
        <div className="flex items-center justify-center space-x-3">
          {/* Hours - First digit */}
          <input
            ref={hoursRef}
            type="text"
            value={hours.charAt(0) || ''}
            onChange={(e) => {
              const value = e.target.value
              if (validateHours(value, hours)) {
                const newHours = value + hours.charAt(1)
                setHours(newHours)
                if (value.length === 1) {
                  // Focus the second hours input
                  const secondHoursInput = document.querySelector('input[data-digit="hours-2"]') as HTMLInputElement
                  if (secondHoursInput) {
                    secondHoursInput.focus()
                  }
                }
                updateTime()
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && hours.charAt(0) === '') {
                e.preventDefault()
              }
            }}
            data-digit="hours-1"
            placeholder="1"
            disabled={isReadOnly}
            maxLength={1}
            className={`w-16 h-16 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-2xl font-semibold ${
              isReadOnly 
                ? 'bg-slate-100 border-slate-300 text-slate-600 cursor-default' 
                : 'border-slate-300 bg-white hover:border-blue-300'
            }`}
          />
          
          {/* Hours - Second digit */}
          <input
            type="text"
            value={hours.charAt(1) || ''}
            onChange={(e) => {
              const value = e.target.value
              if (validateHours(value, hours)) {
                const newHours = hours.charAt(0) + value
                setHours(newHours)
                if (value.length === 1) {
                  // Focus the first minutes input
                  const firstMinutesInput = document.querySelector('input[data-digit="minutes-1"]') as HTMLInputElement
                  if (firstMinutesInput) {
                    firstMinutesInput.focus()
                  }
                }
                updateTime()
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && hours.charAt(1) === '') {
                e.preventDefault()
                hoursRef.current?.focus()
              }
            }}
            data-digit="hours-2"
            placeholder="2"
            disabled={isReadOnly}
            maxLength={1}
            className={`w-16 h-16 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-2xl font-semibold ${
              isReadOnly 
                ? 'bg-slate-100 border-slate-300 text-slate-600 cursor-default' 
                : 'border-slate-300 bg-white hover:border-blue-300'
            }`}
          />
          
          {/* Colon */}
          <span className="text-4xl font-bold text-blue-400">:</span>
          
          {/* Minutes - First digit */}
          <input
            ref={minutesRef}
            type="text"
            value={minutes.charAt(0) || ''}
            onChange={(e) => {
              const value = e.target.value
              if (validateMinutes(value, minutes)) {
                const newMinutes = value + minutes.charAt(1)
                setMinutes(newMinutes)
                if (value.length === 1) {
                  // Focus the second minutes input
                  const secondMinutesInput = document.querySelector('input[data-digit="minutes-2"]') as HTMLInputElement
                  if (secondMinutesInput) {
                    secondMinutesInput.focus()
                  }
                }
                updateTime()
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && minutes.charAt(0) === '') {
                e.preventDefault()
                // Focus the second hours input
                const secondHoursInput = document.querySelector('input[data-digit="hours-2"]') as HTMLInputElement
                if (secondHoursInput) {
                  secondHoursInput.focus()
                }
              }
            }}
            data-digit="minutes-1"
            placeholder="0"
            disabled={isReadOnly}
            maxLength={1}
            className={`w-16 h-16 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-2xl font-semibold ${
              isReadOnly 
                ? 'bg-slate-100 border-slate-300 text-slate-600 cursor-default' 
                : 'border-slate-300 bg-white hover:border-blue-300'
            }`}
          />
          
          {/* Minutes - Second digit */}
          <input
            type="text"
            value={minutes.charAt(1) || ''}
            onChange={(e) => {
              const value = e.target.value
              if (validateMinutes(value, minutes)) {
                const newMinutes = minutes.charAt(0) + value
                setMinutes(newMinutes)
                updateTime()
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && minutes.charAt(1) === '') {
                e.preventDefault()
                minutesRef.current?.focus()
              }
            }}
            data-digit="minutes-2"
            placeholder="0"
            disabled={isReadOnly}
            maxLength={1}
            className={`w-16 h-16 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-2xl font-semibold ${
              isReadOnly 
                ? 'bg-slate-100 border-slate-300 text-slate-600 cursor-default' 
                : 'border-slate-300 bg-white hover:border-blue-300'
            }`}
          />
          
          {/* AM/PM */}
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handlePeriodChange('AM')}
              disabled={isReadOnly}
              className={`px-4 py-3 rounded-lg font-semibold transition-colors text-lg ${
                period === 'AM'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:border-amber-200'
              } ${isReadOnly ? 'cursor-default opacity-50' : ''}`}
            >
              AM
            </button>
            <button
              type="button"
              onClick={() => handlePeriodChange('PM')}
              disabled={isReadOnly}
              className={`px-4 py-3 rounded-lg font-semibold transition-colors text-lg ${
                period === 'PM'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:border-amber-200'
              } ${isReadOnly ? 'cursor-default opacity-50' : ''}`}
            >
              PM
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 