import { CardsSkeleton } from '../skeletons'

const Dashboard = () => {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardsSkeleton />
      </div>
    </main>
  )
}

export default Dashboard
