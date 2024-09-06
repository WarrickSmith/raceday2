import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatNZTime } from '@/lib/utils'

interface Race {
  id: string
  name: string
  norm_time: string
}

const RaceList = ({ races }: { races: Race[] }) => {
  if (!races || races.length === 0) {
    return <p className="mt-4 text-gray-400">No races available.</p>
  }

  return (
    <ScrollArea className="h-full w-full rounded-md pr-4">
      {races.map((race) => (
        <Button
          key={race.id}
          variant={race.id === races[1]?.id ? 'default' : 'ghost'}
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
