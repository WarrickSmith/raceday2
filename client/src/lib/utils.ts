import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(text: string) {
  if (typeof text !== 'string') {
    return ''
  }

  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatNZTime = (utcTimeString: string) => {
  const [datePart, timePart] = utcTimeString.split(', ')
  const [day, month, year] = datePart.split('/')
  const [time, period] = timePart.split(' ')
  const [hours, minutes, seconds] = time.split(':')

  // Convert to 24-hour format if needed
  let hour24 = parseInt(hours)
  if (period.toLowerCase() === 'pm' && hour24 !== 12) {
    hour24 += 12
  } else if (period.toLowerCase() === 'am' && hour24 === 12) {
    hour24 = 0
  }

  const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0'
  )}T${hour24.toString().padStart(2, '0')}:${minutes}:${seconds}.000Z`

  const date = new Date(isoString)

  return date.toLocaleTimeString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
