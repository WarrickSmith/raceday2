'use client'

import { useState, useEffect } from 'react'
import { useMeetingContext } from '@/contexts/meeting-context'
import { getMeetingById } from '@/lib/actions/dashboard.actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, MapPinIcon, TagIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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
  const { name, date, venue, type, status } = meetingData
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>DATE: {new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
            <span>VENUE: {venue}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TagIcon className="h-4 w-4 text-muted-foreground" />
            <span>TYPE: {type}</span>
          </div>
          <Badge variant={status === 'Active' ? 'destructive' : 'secondary'}>
            MEETING STATUS: {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default Meeting
