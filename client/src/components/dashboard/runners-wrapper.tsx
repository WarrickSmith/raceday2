import { Rabbit } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RunnerList from './runners'

const RunnersWrapper = () => {
  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="flex flex-row items-center space-y-0 pb-6 gap-2">
        <Rabbit />
        <CardTitle className="text-lg font-medium">Runners</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <RunnerList />
      </CardContent>
    </Card>
  )
}

export default RunnersWrapper
