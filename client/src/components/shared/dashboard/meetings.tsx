'use client'

import { Button } from '@/components/ui/button'
import * as ScrollArea from '@radix-ui/react-scroll-area'

interface Meeting {
  id: string
  name: string
  country: string
}

const MeetingsList = ({ meetings }: { meetings: Meeting[] }) => {
  if (!meetings || meetings.length === 0) {
    return <p className="mt-4 text-gray-400">No meetings available.</p>
  }

  return (
    <ScrollArea.Root className="w-full h-[calc(100%-0rem)] rounded overflow-hidden">
      <ScrollArea.Viewport className="w-full h-full rounded">
        <div>
          {meetings.map((meeting) => (
            <Button
              key={meeting.id}
              variant={meeting.id === meetings[1]?.id ? 'default' : 'ghost'}
              className="w-full grid grid-cols-[1fr,auto] gap-2 items-center mb-2"
            >
              <span className="text-left truncate">{meeting.name}</span>
              <span className="text-right">{meeting.country}</span>
            </Button>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-4 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 absolute right-0 top-0 bottom-0"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>{' '}
    </ScrollArea.Root>
  )
}

export default MeetingsList
