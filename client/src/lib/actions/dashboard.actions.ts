const API_URL = process.env.API_URL

export const meetingsToday = async () => {
  try {
    if (!API_URL) {
      console.error('NEXT_PUBLIC_API_URL is not defined in the environment')
      return []
    }

    const res = await fetch(`${API_URL}/meetings/today`)
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`)
      return []
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching meetings today:', error)
    return []
  }
}

export const getRaces = async (meetingId: string) => {
  try {
    if (!API_URL) {
      console.error('NEXT_PUBLIC_API_URL is not defined in the environment')
      return []
    }

    const res = await fetch(`${API_URL}/races/meeting/${meetingId}`)
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`)
      return []
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching races:', error)
    return []
  }
}

export const getRunners = async (raceId: string) => {
  try {
    if (!API_URL) {
      console.error('NEXT_PUBLIC_API_URL is not defined in the environment')
      return []
    }

    const res = await fetch(`${API_URL}/runners/race/${raceId}`)
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`)
      return []
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching races:', error)
    return []
  }
}
