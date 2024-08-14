import RaceMeeting from '../src/models/RaceMeeting'
import Race from '../src/models/Race'
import Runner from '../src/models/Runner'
import { Schema } from 'mongoose'
import { testData } from './test-data'

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

const retry = async (
  fn: () => Promise<any>,
  retries = MAX_RETRIES
): Promise<any> => {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return retry(fn, retries - 1)
    }
    throw error
  }
}

export const createTestData = async () => {
  let countmeetings = 0
  try {
    console.log(
      `\x1b[35m  Attempting to create test data... #meetings : ${testData.meetings.length}\x1b[0m`
    )
    for (const meeting of testData.meetings) {
      console.log(
        `\x1b[92m  Saving...  Country: ${meeting.country}  Type: ${meeting.type}  ${meeting.name}\x1b[0m`
      )
      if (meeting.id === null) {
        console.log(
          `\x1b[31m  Error: Meeting ID is null. Skipping... Country: ${meeting.country}  Type: ${meeting.type}  ${meeting.name}\x1b[0m`
        )
        continue
      }

      await retry(async () => {
        const raceMeeting = await RaceMeeting.findOneAndUpdate(
          { id: meeting.id, date: new Date(testData.date) },
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

        countmeetings++

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
      })
    }

    console.log(`\x1b[35m  ${countmeetings} Race Meetings were created.\x1b[0m`)

    return {
      message: ` Race meetings fetched and stored successfully`,
    }
  } catch (error) {
    console.error('Error fetching and storing race meetings:', error)
    throw error
  }
}
