'use client'

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { meetingsToday } from '@/lib/actions/dashboard.actions'

const MeetingContext = createContext<{
  meetingId: string
  setMeetingId: (id: string) => void
}>({
  meetingId: '',
  setMeetingId: () => {},
})

export const MeetingContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [meetingId, setMeetingId] = useState('')

  useEffect(() => {
    const initializeMeetingId = async () => {
      const meetings = await meetingsToday()
      if (meetings && meetings.length > 0) {
        setMeetingId(meetings[0]._id)
      }
    }

    initializeMeetingId()
  }, [])

  return (
    <MeetingContext.Provider value={{ meetingId, setMeetingId }}>
      {children}
    </MeetingContext.Provider>
  )
}

export function useMeetingContext() {
  return useContext(MeetingContext)
}
