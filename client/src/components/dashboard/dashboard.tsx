import RaceMeetingsWrapper from './race-meetings-wrapper'
import MeetingWrapper from './meeting-wrapper'

const Dashboard = () => {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Racing Dashboard 2025</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <RaceMeetingsWrapper />
        <MeetingWrapper />
      </div>
    </main>
  )
}
export default Dashboard
