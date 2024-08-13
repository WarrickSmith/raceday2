import Race, { IRace } from '../models/Race'

const convertToNZTime = (utcDate: Date) => {
  return new Date(utcDate).toLocaleString('en-NZ', {
    timeZone: 'Pacific/Auckland',
  })
}

const convertRacesToNZTime = (races: IRace[]) => {
  return races.map((race) => ({
    ...race.toObject(),
    norm_time: convertToNZTime(race.norm_time),
  }))
}

export const raceService = {
  getAllRaces: async () => {
    const races = await Race.find()
    return convertRacesToNZTime(races)
  },

  getRacesByMeetingId: async (meetingId: string) => {
    const races = await Race.find({ raceMeeting: meetingId })
    return convertRacesToNZTime(races)
  },

  getTodaysRaces: async () => {
    const today = new Date()
    const startOfDay = new Date(today.setHours(0, 0, 0, 0))
    const endOfDay = new Date(today.setHours(23, 59, 59, 999))

    const races = await Race.find({
      norm_time: {
        $gte: startOfDay.toISOString(),
        $lt: endOfDay.toISOString(),
      },
    })

    console.log("#today's races: ", races.length)
    return convertRacesToNZTime(races)
  },

  getRaceById: async (id: string) => {
    const race = await Race.findById(id).populate('runners')
    if (race) {
      return {
        ...race.toObject(),
        norm_time: convertToNZTime(race.norm_time),
      }
    }
    return null
  },

  createRace: async (data: any) => {
    const race = new Race(data)
    const savedRace = await race.save()
    return {
      ...savedRace.toObject(),
      norm_time: convertToNZTime(savedRace.norm_time),
    }
  },

  updateRace: async (id: string, data: any) => {
    const updatedRace = await Race.findByIdAndUpdate(id, data, {
      new: true,
    })
    if (updatedRace) {
      return {
        ...updatedRace.toObject(),
        norm_time: convertToNZTime(updatedRace.norm_time),
      }
    }
    return null
  },

  deleteRace: async (id: string) => {
    const deletedRace = await Race.findByIdAndDelete(id)
    return !!deletedRace
  },
}
