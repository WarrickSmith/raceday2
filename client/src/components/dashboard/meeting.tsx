'use client'

import { useState, useEffect } from 'react'
import { useMeetingContext } from '@/contexts/meeting-context'
import { getMeetingById } from '@/lib/actions/dashboard.actions'
import MeetingCard from './meeting-card'

const Meeting = () => {
  const { meetingId } = useMeetingContext()
  const [meetingData, setMeetingData] = useState(null)

  useEffect(() => {
    const fetchMeetingData = async () => {
      if (meetingId) {
        const data = await getMeetingById(meetingId)
        setMeetingData(data)
      }
    }
    fetchMeetingData()
  }, [meetingId])

  if (!meetingData) {
    return (
      <p className="mt-4 text-gray-400">
        No meeting data available. Please select a meeting.
      </p>
    )
  }

  return <MeetingCard meetingData={meetingData} />
}

export default Meeting
