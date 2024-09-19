const API_URL = process.env.API_URL
const CLIENT_API_URL = process.env.NEXT_PUBLIC_API_URL

export const meetingsToday = async () => {
  console.log('MEETINGS-TODAY-CALLED - URL : ', API_URL)
  try {
    if (!API_URL) {
      console.error('API_URL is not defined in the environment')
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

export const getMeetingById = async (id: string) => {
  console.log('GET-MEETING-BY-ID-CALLED - URL : ', API_URL || CLIENT_API_URL)
  try {
    if (!API_URL && !CLIENT_API_URL) {
      console.error('API_URL is not defined in the environment')
      return null
    }

    const res = await fetch(`${API_URL || CLIENT_API_URL}/meetings/${id}`)
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`)
      return null
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching meeting:', error)
    return null
  }
}

export const getRaces = async (meetingId: string) => {
  try {
    if (!API_URL) {
      console.error('API_URL is not defined in the environment')
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
      console.error('API_URL is not defined in the environment')
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
