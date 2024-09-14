import { CalendarFold } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Meetings from './meetings'

const RaceMeetingsWrapper = () => {
  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="flex flex-row items-center space-y-0 pb- gap-2">
        <CalendarFold />
        <CardTitle className="text-lg font-medium">
          {"Today's Meetings"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <Meetings />
      </CardContent>
    </Card>
  )
}

export default RaceMeetingsWrapper
