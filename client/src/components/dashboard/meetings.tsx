import { unstable_noStore as noStore } from 'next/cache'
import { ScrollArea } from '@/components/ui/scroll-area'
import { meetingsToday } from '@/lib/actions/dashboard.actions'
import MeetingButton from './meeting-button'

interface Meeting {
  _id: string
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
      {meetings.map((meeting: Meeting, index: number) => (
        <MeetingButton
          key={meeting.name}
          id={meeting._id}
          name={meeting.name}
          country={meeting.country}
          isSelected={index === 1}
        />
      ))}
    </ScrollArea>
  )
}

export default MeetingsList
