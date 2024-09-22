'use client'

import { useState, useEffect } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getRaces } from '@/lib/actions/dashboard.actions'
import { formatNZTime } from '@/lib/utils'
import { useMeetingContext } from '@/contexts/meeting-context'

interface Race {
  id: string
  name: string
  norm_time: string
}

const RaceList = () => {
  noStore()
  const { meetingId } = useMeetingContext()
  const [races, setRaces] = useState<Race[]>([])

  useEffect(() => {
    const fetchRaces = async () => {
      if (meetingId) {
        const fetchedRaces = await getRaces(meetingId)
        setRaces(fetchedRaces || [])
      }
    }
    fetchRaces()
  }, [meetingId])

  if (!races || races.length === 0) {
    return <p className="mt-4 text-gray-400">No races available.</p>
  }

  return (
    <ScrollArea className="h-full w-full rounded-md pr-4">
      {races.map((race: Race) => (
        <Button
          key={race.id}
          // variant={race.id === races[1]?.id ? 'default' : 'ghost'}
          variant={'ghost'}
          className="w-full grid grid-cols-[1fr,auto] gap-2 items-center mb-2"
        >
          <span className="text-left truncate">{race.name}</span>
          <span className="text-right">{formatNZTime(race.norm_time)}</span>
        </Button>
      ))}
    </ScrollArea>
  )
}

export default RaceList
