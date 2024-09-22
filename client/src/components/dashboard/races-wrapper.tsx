import { BellElectric } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RaceList from './race-list'

const RacesWrapper = () => {
  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="flex flex-row items-center space-y-0 pb-6 gap-2">
        <BellElectric />
        <CardTitle className="text-lg font-medium">Races</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <RaceList />
      </CardContent>
    </Card>
  )
}

export default RacesWrapper
