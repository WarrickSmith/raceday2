'use client'

import { ReactNode } from 'react'
import { MeetingContextProvider } from '@/contexts/meeting-context'

export function Providers({ children }: { children: ReactNode }) {
  return <MeetingContextProvider>{children}</MeetingContextProvider>
}
