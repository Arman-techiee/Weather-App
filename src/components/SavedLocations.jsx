import React, { useState, useEffect } from 'react'
import { RiMapPinLine, RiCloseLine, RiLoader4Line } from 'react-icons/ri'
import { useWeather } from '../context/WeatherContext'
import { fetchCurrentWeather } from '../services/weatherApi'

const SavedLocationCard = ({ city, onSelect, onRemove }) => {
  const { unit } = useWeather()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchCurrentWeather(city)
      .then((d) => { if (!cancelled) setData(d) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [city])

  return (
    <div
      onClick={() => onSelect(city)}
      className="glass-card-light px-4 py-3 rounded-xl cursor-pointer hover:bg-white/10
        transition-all duration-200 flex items-center justify-between group"
    >
      {loading ? (
        <div className="flex items-center gap-2 text-frost-300/50">
          <RiLoader4Line className="animate-spin text-sm" />
          <span className="text-xs">{city}</span>
        </div>
      ) : data ? (
        <div className="flex items-center gap-3 min-w-0">
          <RiMapPinLine className="text-aurora-teal shrink-0 text-sm" />
          <div className="min-w-0">
            <div className="text-sm font-medium text-frost-100 truncate">{data.location.name}</div>
            <div className="text-xs text-frost-300/40 font-mono">{data.location.country}</div>
          </div>
          <div className="ml-auto pl-2 font-mono text-sm text-frost-200 shrink-0">
            {unit === 'C'
              ? `${Math.round(data.current.temp_c)}°C`
              : `${Math.round(data.current.temp_f)}°F`}
          </div>
        </div>
      ) : (
        <span className="text-xs text-frost-300/40">{city}</span>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); onRemove(city) }}
        className="ml-2 text-frost-300/20 hover:text-aurora-coral transition-colors opacity-0 group-hover:opacity-100"
      >
        <RiCloseLine className="text-sm" />
      </button>
    </div>
  )
}

const SavedLocations = () => {
  const { savedLocations, toggleSavedLocation, searchWeather } = useWeather()
  if (savedLocations.length === 0) return null

  return (
    <div className="glass-card p-5 animate-fade-in-up">
      <h2 className="font-display text-lg font-semibold text-frost-100 mb-4">Saved Locations</h2>
      <div className="flex flex-col gap-2">
        {savedLocations.map((city) => (
          <SavedLocationCard
            key={city}
            city={city}
            onSelect={searchWeather}
            onRemove={toggleSavedLocation}
          />
        ))}
      </div>
    </div>
  )
}

export default SavedLocations
