import { useState, useEffect } from 'react'

export function useCountdown(targetISO) {
  const target = new Date(targetISO).getTime()
  const [diff, setDiff] = useState(() => Math.max(0, target - Date.now()))

  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target - Date.now())), 1000)
    return () => clearInterval(id)
  }, [target])

  return {
    days:  String(Math.floor(diff / 86400000)).padStart(2, '0'),
    hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
    mins:  String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
    secs:  String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
    isPast: diff === 0,
  }
}
