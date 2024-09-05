import { Suspense } from 'react'
import { CardSkeleton } from '../skeletons'
import RaceMeetingsWrapper from './race-meetings-wrapper'

const Dashboard = () => {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Racing Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<CardSkeleton />}>
          <RaceMeetingsWrapper />
        </Suspense>
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </main>
  )
}

export default Dashboard
