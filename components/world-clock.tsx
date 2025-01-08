"use client"
import React from 'react'
import { AnalogClock } from './analog-clock'

const cities = [
  { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { name: 'Vietnam', timeZone: 'Asia/Ho_Chi_Minh' },
  { name: 'Georgia', timeZone: 'Asia/Tbilisi' },
  { name: 'Los Angeles', timeZone: 'America/Los_Angeles' },
]

export function WorldClock() {
  return (
    <div className="grid grid-cols-2 gap-12 p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl">
      {cities.map((city) => (
        <div key={city.name} className="flex flex-col items-center gap-4">
          <AnalogClock cityName={city.name} timeZone={city.timeZone} />
          <span className="text-xl font-bold text-gray-300">{city.name}</span>
        </div>
      ))}
    </div>
  )
}

