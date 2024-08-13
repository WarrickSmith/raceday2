import Runner, { IRunner } from '../models/Runner'

export const runnerService = {
  getRunnerById: async (id: string): Promise<IRunner | null> => {
    return await Runner.findById(id)
  },

  getRunnersByRaceId: async (raceId: string): Promise<IRunner[]> => {
    return await Runner.find({ race: raceId })
  },
}
