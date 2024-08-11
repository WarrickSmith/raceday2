import Race, { IRace } from '../models/Race'
import Runner from '../models/Runner'
import { Schema } from 'mongoose'
import { Elysia } from 'elysia'

export const raceService = {
  getAllRaces: async () => {
    return await Race.find()
  },

  getRacesByMeetingId: async (meetingId: string) => {
    return await Race.find({ raceMeeting: meetingId })
  },

  getTodaysRaces: async () => {
    const nzOptions = { timeZone: 'Pacific/Auckland' }
    const nzToday = new Date(new Date().toLocaleString('en-NZ', nzOptions))
    nzToday.setHours(0, 0, 0, 0)
    const nzTomorrow = new Date(nzToday)
    nzTomorrow.setDate(nzTomorrow.getDate() + 1)

    return await Race.find({
      norm_time: {
        $gte: new Date(nzToday.toUTCString()),
        $lt: new Date(nzTomorrow.toUTCString()),
      },
    })
  },

  getRaceById: async (id: string) => {
    return await Race.findById(id).populate('runners')
  },

  createRace: async (data: any) => {
    const race = new Race(data)
    return await race.save()
  },

  updateRace: async (id: string, data: any) => {
    return await Race.findByIdAndUpdate(id, data, {
      new: true,
    })
  },

  deleteRace: async (id: string) => {
    const deletedRace = await Race.findByIdAndDelete(id)
    return !!deletedRace
  },
}
