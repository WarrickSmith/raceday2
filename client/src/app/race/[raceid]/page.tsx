import { getRaceById } from '@/lib/actions/dashboard.actions'
import RaceDetails from '@/components/race/race-details'
import RunnersList from '@/components/race/runners-list'

const RacePage = async ({ params }: { params: { raceid: string } }) => {
  const race = await getRaceById(params.raceid)

  if (!race) {
    return <div>Race not found</div>
  }

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">{race.name}</h1>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <RaceDetails race={race} />
        <RunnersList runners={race.runners} />
      </div>
    </main>
  )
}

export default RacePage
