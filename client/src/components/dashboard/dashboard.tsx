import { Suspense } from 'react'
import { CardSkeleton } from '../shared/skeletons'
import RaceMeetingsWrapper from './race-meetings-wrapper'
import RacesWrapper from './races-wrapper'
import RunnersWrapper from './runners-wrapper'

export const experimental_ppr = true

const Dashboard = () => (
  <main>
    <h1 className={`mb-4 text-xl md:text-2xl`}>Racing Dashboard</h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<CardSkeleton />}>
        <RaceMeetingsWrapper />
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <RacesWrapper />
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <RunnersWrapper />
      </Suspense>
    </div>
  </main>
)

export default Dashboard
