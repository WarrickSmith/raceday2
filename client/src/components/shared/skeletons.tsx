import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row  space-y-0 space-x-3">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-20 h-6" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-60 w-full" />
      </CardContent>
    </Card>
  )
}

export const CardsSkeleton = () => {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  )
}
