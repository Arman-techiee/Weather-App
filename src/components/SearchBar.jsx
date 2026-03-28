import React, { useState, useRef, useEffect } from 'react'
import { RiSearchLine, RiMapPinLine, RiLoader4Line, RiCloseLine, RiTimeLine } from 'react-icons/ri'
import { useWeather } from '../context/WeatherContext'
import { searchLocations } from '../services/weatherApi'
import useDebounce from '../hooks/useDebounce'
import useGeoLocation from '../hooks/useGeoLocation'

const SearchBar = () => {
  const { searchWeather, searchHistory, clearHistory } = useWeather()
  const { getLocation, geoLoading } = useGeoLocation()

  const [query, setQuery]           = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [sugLoading, setSugLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const debouncedQuery = useDebounce(query, 350)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Fetch autocomplete suggestions
  useEffect(() => {
    if (debouncedQuery.length < 2) { setSuggestions([]); return }
    let cancelled = false
    setSugLoading(true)
    searchLocations(debouncedQuery)
      .then((data) => { if (!cancelled) setSuggestions(data) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setSugLoading(false) })
    return () => { cancelled = true }
  }, [debouncedQuery])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    searchWeather(query.trim())
    setQuery('')
    setShowDropdown(false)
  }

  const handleSuggestion = (loc) => {
    searchWeather(`${loc.lat},${loc.lon}`)
    setQuery('')
    setSuggestions([])
    setShowDropdown(false)
  }

  const handleHistory = (city) => {
    searchWeather(city)
    setQuery('')
    setShowDropdown(false)
  }

  const handleGeo = async () => {
    try {
      const coords = await getLocation()
      searchWeather(coords)
      setShowDropdown(false)
    } catch {}
  }

  const showHistory = !query && searchHistory.length > 0

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <RiSearchLine className="absolute left-4 text-frost-300/50 text-lg" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowDropdown(true) }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search city, zip, coordinates…"
            className="weather-input w-full rounded-2xl py-4 pl-11 pr-24 font-sans text-sm text-frost-100
              outline-none transition-all duration-300 placeholder:text-frost-300/50 focus:border-[color:var(--line-strong)]"
            style={{
              backdropFilter: 'blur(18px)',
            }}
          />
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setSuggestions([]) }}
                className="p-2 text-frost-300/60 hover:text-frost-200 transition-colors"
              >
                <RiCloseLine />
              </button>
            )}
            <button
              type="button"
              onClick={handleGeo}
              disabled={geoLoading}
              className="p-2 text-frost-300/60 hover:text-aurora-teal transition-colors"
              title="Use my location"
            >
              {geoLoading ? (
                <RiLoader4Line className="animate-spin" />
              ) : (
                <RiMapPinLine />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && (showHistory || suggestions.length > 0 || sugLoading) && (
        <div
          className="weather-dropdown absolute top-full z-50 mt-2 w-full overflow-hidden rounded-2xl"
          style={{
            backdropFilter: 'blur(20px)',
          }}
        >
          {query && (
            <>
              {sugLoading && (
                <div className="px-4 py-3 flex items-center gap-2 text-frost-300/50 text-sm">
                  <RiLoader4Line className="animate-spin" /> Searching…
                </div>
              )}
              {suggestions.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSuggestion(loc)}
                  className="surface-hover w-full border-b px-4 py-3 text-left last:border-0"
                  style={{ borderColor: 'var(--line-soft)' }}
                >
                  <div className="flex items-center gap-3">
                    <RiMapPinLine className="text-aurora-teal shrink-0" />
                    <div className="text-frost-100 text-sm font-medium">{loc.name}</div>
                    <div className="text-frost-300/70 text-xs font-mono">{loc.region}, {loc.country}</div>
                  </div>
                </button>
              ))}
            </>
          )}

          {showHistory && (
            <div>
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="label-text">Recent Searches</span>
                <button
                  onClick={clearHistory}
                  className="text-xs text-aurora-coral/70 hover:text-aurora-coral transition-colors"
                >
                  Clear
                </button>
              </div>
              {searchHistory.map((city, i) => (
                <button
                  key={i}
                  onClick={() => handleHistory(city)}
                  className="surface-hover flex w-full items-center gap-3 border-t px-4 py-2.5 text-left transition-colors"
                  style={{ borderColor: 'var(--line-soft)' }}
                >
                  <RiTimeLine className="text-frost-300/60 shrink-0 text-sm" />
                  <span className="text-frost-200/85 text-sm">{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
