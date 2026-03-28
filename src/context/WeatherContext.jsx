import React, { createContext, useContext, useState, useCallback } from 'react'
import { fetchCurrentWeather } from '../services/weatherApi'

const WeatherContext = createContext(null)

const MAX_HISTORY = 10

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather]     = useState(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wx_history') || '[]')
    } catch {
      return []
    }
  })
  const [savedLocations, setSavedLocations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wx_saved') || '[]')
    } catch {
      return []
    }
  })
  const [unit, setUnit] = useState('C') // 'C' or 'F'

  const saveToHistory = useCallback((city) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase())
      const updated  = [city, ...filtered].slice(0, MAX_HISTORY)
      localStorage.setItem('wx_history', JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearHistory = useCallback(() => {
    setSearchHistory([])
    localStorage.removeItem('wx_history')
  }, [])

  const toggleSavedLocation = useCallback((city) => {
    setSavedLocations((prev) => {
      const exists  = prev.some((c) => c.toLowerCase() === city.toLowerCase())
      const updated = exists ? prev.filter((c) => c.toLowerCase() !== city.toLowerCase()) : [...prev, city]
      localStorage.setItem('wx_saved', JSON.stringify(updated))
      return updated
    })
  }, [])

  const searchWeather = useCallback(async (location) => {
    if (!location.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchCurrentWeather(location)
      setWeather(data)
      saveToHistory(data.location.name + ', ' + data.location.country)
    } catch (err) {
      const msg =
        err?.response?.data?.error?.message ||
        'Could not fetch weather data. Check your API key and location.'
      setError(msg)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }, [saveToHistory])

  const toggleUnit = useCallback(() => {
    setUnit((u) => (u === 'C' ? 'F' : 'C'))
  }, [])

  const temp = useCallback(
    (c) => (unit === 'C' ? `${Math.round(c)}°C` : `${Math.round((c * 9) / 5 + 32)}°F`),
    [unit]
  )

  return (
    <WeatherContext.Provider
      value={{
        weather,
        loading,
        error,
        searchHistory,
        savedLocations,
        unit,
        searchWeather,
        clearHistory,
        toggleSavedLocation,
        toggleUnit,
        temp,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => {
  const ctx = useContext(WeatherContext)
  if (!ctx) throw new Error('useWeather must be used within WeatherProvider')
  return ctx
}
