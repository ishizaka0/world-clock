"use client"
"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SunHorizon, MoonStars } from "phosphor-react";

interface AnalogClockProps {
  cityName: string
  timeZone: string
}

export function AnalogClock({ cityName, timeZone }: AnalogClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hour = time.toLocaleString('en-US', { hour: 'numeric', hour12: true, timeZone })
  const minute = time.toLocaleString('en-US', { minute: 'numeric', timeZone })
  const second = time.toLocaleString('en-US', { second: 'numeric', timeZone })
  const ampm = time.toLocaleString('en-US', { hour12: true, timeZone }).slice(-2)

  const hourDegrees = ((parseInt(hour) % 12) + parseInt(minute) / 60) * 30
  const minuteDegrees = (parseInt(minute) + parseInt(second) / 60) * 6
  const secondDegrees = parseInt(second) * 6

  return (
    <div className="relative w-64 h-64">
      {/* Clock face */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg" />
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-700 to-gray-800" />
      
      {/* City name */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm text-gray-300" style={{marginBottom: '140px'}}>
          {time.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}
        </span>
        {ampm === 'AM' ? (
          <SunHorizon size={24} style={{marginTop: '-20px', color: 'gray'}} />
        ) : (
          <MoonStars size={24} style={{marginTop: '-20px', color: 'gray'}} />
        )}
      </div>
      {/* Icon selection (for demonstration purposes, not interactive) */}
      {/* <div className="absolute bottom-0 left-0 p-2 text-gray-500 text-xs">
        Icon set: Font Awesome (fa-sun, fa-sun-bright, fa-moon) and SVG
      </div> */}
      {/* Hour markers */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-3 bg-gray-300"
          style={{
            top: '31%',
            left: '50%',
            transform: `rotate(${i * 30}deg) translateY(-65px)`,
            transformOrigin: '50% 50px'
          }}
        />
      ))}

      {/* Clock hands */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute w-1 h-16 bg-gray-300 rounded-full origin-bottom"
          style={{ 
            bottom: '0',
            left: '50%',
            transform: `translateX(-50%) rotate(${hourDegrees}deg)`
          }}
          animate={{ rotate: hourDegrees }}
          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
        />
        <motion.div
          className="absolute w-0.5 h-24 bg-gray-300 rounded-full origin-bottom"
          style={{ 
            bottom: '0',
            left: '50%',
            transform: `translateX(-50%) rotate(${minuteDegrees}deg)`
          }}
          animate={{ rotate: minuteDegrees }}
          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
        />
        <motion.div
          className="absolute w-[1px] h-28 bg-red-500 origin-bottom"
          style={{ 
            bottom: '0',
            left: '50%',
            transform: `translateX(-50%) rotate(${secondDegrees}deg)`
          }}
          animate={{ rotate: secondDegrees }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        />
      </div>
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-md" />
    </div>
  )
}

