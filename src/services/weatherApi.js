import axios from 'axios'

const BASE_URL = 'https://api.weatherapi.com/v1'

// WeatherAPI.com free tier — replace with your key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'YOUR_API_KEY_HERE'

const weatherClient = axios.create({
  baseURL: BASE_URL,
  params: { key: API_KEY },
})

/**
 * Get current weather + 3-day forecast + air quality
 * @param {string} location - city name, lat/lon, zip, etc.
 */
export const fetchCurrentWeather = async (location) => {
  const { data } = await weatherClient.get('/forecast.json', {
    params: {
      q: location,
      days: 7,
      aqi: 'yes',
      alerts: 'yes',
    },
  })
  return data
}

/**
 * Search for location suggestions
 * @param {string} query
 */
export const searchLocations = async (query) => {
  const { data } = await weatherClient.get('/search.json', {
    params: { q: query },
  })
  return data
}

/**
 * Get astronomy data (sunrise/sunset/moonrise/moonset)
 * @param {string} location
 */
export const fetchAstronomy = async (location) => {
  const { data } = await weatherClient.get('/astronomy.json', {
    params: { q: location },
  })
  return data
}
