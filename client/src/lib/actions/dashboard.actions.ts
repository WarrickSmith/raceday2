'use server'

export const meetingsToday = async () => {
  try {
    const apiUrl = process.env.RACEDAY2_API_URL

    if (!apiUrl) {
      throw new Error('RACEDAY2_API_URL is not defined in the environment')
    }

    const res = await fetch(`${apiUrl}/meetings/alltoday`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching meetings today:', error)
    throw error
  }
}
