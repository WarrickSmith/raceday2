import { CalendarFold } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import { CardSkeleton, CardSkeletonSmall } from '../shared/skeletons'
import Meeting from './meeting'
import RacesWrapper from './races-wrapper'

const MeetingWrapper = () => {
  return (
    <Card className="h-[680px] flex flex-col">
      <CardHeader className="flex flex-row items-center space-y-0 pb- gap-2">
        <CalendarFold />
        <CardTitle className="text-lg font-medium">
          {'Meeting Details'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <Suspense fallback={<CardSkeletonSmall />}>
          <Meeting />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <RacesWrapper />
        </Suspense>
      </CardContent>
    </Card>
  )
}

export default MeetingWrapper
