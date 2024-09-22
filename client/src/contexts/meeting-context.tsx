'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

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

  return (
    <MeetingContext.Provider value={{ meetingId, setMeetingId }}>
      {children}
    </MeetingContext.Provider>
  )
}

export function useMeetingContext() {
  return useContext(MeetingContext)
}
