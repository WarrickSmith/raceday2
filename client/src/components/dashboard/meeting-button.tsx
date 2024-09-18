'use client'

import Link from 'next/link'
import { Button } from '../ui/button'

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
  return (
    <Link href={`/meetings/${id}`}>
      <Button
        variant={isSelected ? 'default' : 'ghost'}
        className="w-full grid grid-cols-[1fr,auto] gap-2 items-center mb-2"
      >
        <span className="text-left truncate">{name}</span>
        <span className="text-right">{country}</span>
      </Button>
    </Link>
  )
}
