import { unstable_noStore as noStore } from 'next/cache'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMeetingById } from '@/lib/actions/dashboard.actions'
import { CalendarIcon, MapPinIcon, TagIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const Meeting = async () => {
  console.log('MEETING')
  noStore
  const meeting = await getMeetingById('66c58ed40e48625383e38638')

  if (!meeting || meeting.length === 0) {
    return <p className="mt-4 text-gray-400">No races available.</p>
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{meeting.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>DATE: {new Date(meeting.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
            <span>VENUE: {meeting.venue}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TagIcon className="h-4 w-4 text-muted-foreground" />
            <span>TYPE: {meeting.type}</span>
          </div>
          <Badge
            variant={meeting.status === 'Active' ? 'destructive' : 'secondary'}
          >
            MEETING STATUS: {meeting.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default Meeting
