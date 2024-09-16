import { unstable_noStore as noStore } from 'next/cache'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getRunners } from '@/lib/actions/dashboard.actions'
import { formatNZTime } from '@/lib/utils'

interface Race {
  name: string
  barrier: string
}

const RunnerList = async () => {
  noStore()
  const runners = (await getRunners('66e75ab0544af27e935f4b3a')) || []
  if (!runners || runners.length === 0) {
    return <p className="mt-4 text-gray-400">No runners available.</p>
  }

  return (
    <ScrollArea className="h-full w-full rounded-md pr-4">
      {runners.map((runner: Race) => (
        <Button
          key={runner.name}
          variant={runner.name === runners[1]?.name ? 'default' : 'ghost'}
          className="w-full grid grid-cols-[1fr,auto] gap-2 items-center mb-2"
        >
          <span className="text-left truncate">{runner.name}</span>
          <span className="text-right">Barrier: {runner.barrier}</span>
        </Button>
      ))}
    </ScrollArea>
  )
}
export default RunnerList
