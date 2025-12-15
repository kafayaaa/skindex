// components/MiniCalendar.tsx
'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CalendarMini() {
  const [currentDate] = useState(new Date())
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const dayNames = ['M', 'S', 'S', 'R', 'K', 'J', 'S']
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()
  
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()
  
  const today = currentDate.getDate()

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="font-medium text-zinc-900 dark:text-zinc-100">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <div className="flex gap-2">
          <button className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((day, idx) => (
          <div key={idx} className="text-center text-xs text-zinc-500 dark:text-zinc-400 py-1">
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDay }).map((_, idx) => (
          <div key={`empty-${idx}`} className="aspect-square"></div>
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1
          const isToday = day === today
          
          return (
            <button
              key={day}
              className={`
                aspect-square rounded text-sm flex items-center justify-center
                ${isToday 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                }
              `}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}