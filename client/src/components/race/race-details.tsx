import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatNZTime } from '@/lib/utils'

interface Race {
  id: string
  _id: string
  name: string
  norm_time: string
  class: string
  length: string
  track: string
  weather: string
  status: string
  stake: string
}

const RaceDetails = ({ race }: { race: Race }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Race Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Time: {formatNZTime(race.norm_time)}</p>
          <p>Class: {race.class}</p>
          <p>Length: {race.length}</p>
          <p>Track: {race.track}</p>
          <p>Weather: {race.weather}</p>
          <p>Status: {race.status}</p>
          <p>Stake: {race.stake}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default RaceDetails
