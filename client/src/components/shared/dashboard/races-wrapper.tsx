import { getRaces } from '@/lib/actions/dashboard.actions'
import { BellElectric } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RaceList from './races'

const RacesWrapper = async () => {
  const races: any = await getRaces('66d8bca86cb97bdb973e5a8c')

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="flex flex-row items-center space-y-0 pb-6 gap-2">
        <BellElectric />
        <CardTitle className="text-lg font-medium">Races</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <RaceList races={races} />
      </CardContent>
    </Card>
  )
}

export default RacesWrapper
