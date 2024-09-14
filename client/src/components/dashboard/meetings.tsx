import { unstable_noStore as noStore } from 'next/cache'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { meetingsToday } from '@/lib/actions/dashboard.actions'

interface Meeting {
  id: string
  name: string
  country: string
}

const MeetingsList = async () => {
  noStore()
  const meetings = (await meetingsToday()) || []
  if (!meetings || meetings.length === 0) {
    return <p className="mt-4 text-gray-400">No meetings available.</p>
  }

  return (
    <ScrollArea className="h-full w-full rounded-md pr-4">
      {meetings.map((meeting: Meeting) => (
        <Button
          key={meeting.id}
          variant={meeting.id === meetings[1]?.id ? 'default' : 'ghost'}
          className="w-full grid grid-cols-[1fr,auto] gap-2 items-center mb-2"
        >
          <span className="text-left truncate">{meeting.name}</span>
          <span className="text-right">{meeting.country}</span>
        </Button>
      ))}
    </ScrollArea>
  )
}

export default MeetingsList
