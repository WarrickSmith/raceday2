import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Runner {
  number: number
  name: string
  barrier: number
}

const RunnersList = ({ runners }: { runners: Runner[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Runners</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Barrier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {runners.map((runner) => {
              return (
                <TableRow key={runner.name}>
                  <TableCell>{runner.number}</TableCell>
                  <TableCell>{runner.name}</TableCell>
                  <TableCell>{runner.barrier}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default RunnersList
