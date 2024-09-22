'use client'

import { Button } from '../ui/button'
import { useMeetingContext } from '@/contexts/meeting-context'

interface MeetingButtonProps {
  id: string
  name: string
  country: string
  isSelected: boolean
}

export default function MeetingButton({
  id,
  name,
  country,
  isSelected,
}: MeetingButtonProps) {
  const { meetingId, setMeetingId } = useMeetingContext()

  const handleClick = () => {
    setMeetingId(id)
  }

  return (
    <Button
      variant={id === meetingId ? 'default' : 'ghost'}
      className="w-full grid grid-cols-[1fr,auto] gap-2 items-center mb-2"
      onClick={handleClick}
    >
      <span className="text-left truncate">{name}</span>
      <span className="text-right">{country}</span>
    </Button>
  )
}
