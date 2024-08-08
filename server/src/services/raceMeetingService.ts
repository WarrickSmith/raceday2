import axios from 'axios'
import RaceMeeting, { IRaceMeeting } from '../models/RaceMeeting'
import Race, { IRace } from '../models/Race'
import Runner, { IRunner } from '../models/Runner'
import { Schema } from 'mongoose'

const nzTabUrl = process.env.NZ_TAB_URL || ''

export const raceMeetingService = {
  fetchAndStoreRaceMeetings: async () => {
    try {
      const response = await axios.get(nzTabUrl)
      const data = response.data

      for (const meeting of data.meetings) {
        console.log(
          `Saving...  ${meeting.name}  Type: ${meeting.type}  Country: ${meeting.country}`
        )
        if (meeting.id === null) {
          continue
        }

        const raceMeeting = await RaceMeeting.findOneAndUpdate(
          { id: meeting.id, date: new Date(data.date) },
          {
            betslip_type: meeting.betslip_type,
            code: meeting.code,
            country: meeting.country,
            name: meeting.name,
            number: meeting.number,
            nz: meeting.nz,
            penetrometer: meeting.penetrometer,
            status: meeting.status,
            track_dir: meeting.track_dir,
            type: meeting.type,
            venue: meeting.venue,
            races: [],
          },
          { upsert: true, new: true }
        )

        for (const raceData of meeting.races) {
          if (raceData.id === null) {
            continue
          }

          const race = await Race.findOneAndUpdate(
            { id: raceData.id, raceMeeting: raceMeeting._id },
            {
              ...raceData,
              raceMeeting: raceMeeting._id,
              runners: [],
            },
            { upsert: true, new: true }
          )

          if (!raceMeeting.races.includes(race._id as Schema.Types.ObjectId)) {
            raceMeeting.races.push(race._id as Schema.Types.ObjectId)
          }

          for (const runnerData of raceData.entries) {
            const runner = await Runner.findOneAndUpdate(
              { name: runnerData.name, race: race._id },
              {
                ...runnerData,
                race: race._id,
                raceMeeting: raceMeeting._id,
              },
              { upsert: true, new: true }
            )

            if (!race.runners.includes(runner._id as Schema.Types.ObjectId)) {
              race.runners.push(runner._id as Schema.Types.ObjectId)
            }
          }

          await race.save()
        }

        await raceMeeting.save()
      }

      return { message: 'Race meetings fetched and stored successfully' }
    } catch (error) {
      console.error('Error fetching and storing race meetings:', error)
      throw error
    }
  },

  getAllTodaysData: async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return await RaceMeeting.find({
      date: { $gte: today, $lt: tomorrow },
    }).populate({
      path: 'races',
      populate: {
        path: 'runners',
      },
    })
  },
  getAllRaceMeetings: async () => {
    return await RaceMeeting.find()
    // .populate({
    //   path: 'races',
    //   populate: {
    //     path: 'runners',
    //   },
    // })
  },

  getTodaysRaceMeetings: async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return await RaceMeeting.find({
      date: { $gte: today, $lt: tomorrow },
    })
    // .populate({
    //   path: 'races',
    //   populate: {
    //     path: 'runners',
    //   },
    // })
  },

  getRaceMeetingById: async (id: string) => {
    return await RaceMeeting.findById(id)
    // .populate({
    //   path: 'races',
    //   populate: {
    //     path: 'runners',
    //   },
    // })
  },

  createRaceMeeting: async (data: any) => {
    const raceMeeting = new RaceMeeting(data)
    return await raceMeeting.save()
  },

  updateRaceMeeting: async (id: string, data: any) => {
    return await RaceMeeting.findByIdAndUpdate(id, data, { new: true })
  },

  deleteRaceMeeting: async (id: string) => {
    return await RaceMeeting.findByIdAndDelete(id)
  },
}
