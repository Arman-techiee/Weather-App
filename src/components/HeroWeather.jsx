import { RiStarFill, RiStarLine, RiDropLine, RiWindyLine, RiEyeLine } from 'react-icons/ri'
import { useWeather } from '../context/WeatherContext'
import { getWeatherEmoji, getWeatherTheme } from '../utils/helpers'

const HeroWeather = () => {
  const { weather, temp, unit, toggleUnit, toggleSavedLocation, savedLocations } = useWeather()
  if (!weather) return null

  const { location, current } = weather
  const cityKey = `${location.name}, ${location.country}`
  const isSaved = savedLocations.some((c) => c.toLowerCase() === cityKey.toLowerCase())
  const emoji   = getWeatherEmoji(current.condition.code, current.is_day)
  const theme = getWeatherTheme(current.condition.code, current.is_day)

  const localTime = new Date(location.localtime)
  const timeStr   = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const dateStr   = localTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in-up relative overflow-hidden">
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: theme.glow }}
      />
      <div
        className="absolute inset-x-0 top-0 h-24 opacity-80 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${theme.accent} 10%, white), transparent)`,
        }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-start justify-between md:justify-start gap-4 mb-1">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-frost-100 leading-tight">
                {location.name}
              </h1>
              <p className="label-text mt-1">{location.region}, {location.country}</p>
            </div>
            <button
              onClick={() => toggleSavedLocation(cityKey)}
              className="mt-1 text-xl transition-all duration-300 hover:scale-125"
              title={isSaved ? 'Remove from saved' : 'Save location'}
            >
              {isSaved
                ? <RiStarFill className="text-aurora-gold" />
                : <RiStarLine className="text-frost-300/70 hover:text-aurora-gold" />}
            </button>
          </div>

          <p className="text-frost-300/70 text-xs font-mono mt-2">{dateStr} · {timeStr}</p>

          <div className="flex items-end gap-4 mt-4">
            <span className="font-display text-7xl md:text-8xl font-bold text-frost-100 leading-none">
              {unit === 'C'
                ? `${Math.round(current.temp_c)}°`
                : `${Math.round(current.temp_f)}°`}
            </span>
            <button
              onClick={toggleUnit}
              className="weather-chip mb-3 rounded-lg px-3 py-1 text-sm font-mono transition-all hover:-translate-y-0.5"
            >
              {unit === 'C' ? '°F' : '°C'}
            </button>
          </div>

          <p className="text-frost-200/80 font-medium mt-1">{current.condition.text}</p>
          <p className="text-frost-300/70 text-sm mt-0.5">
            Feels like {unit === 'C' ? `${Math.round(current.feelslike_c)}°C` : `${Math.round(current.feelslike_f)}°F`}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div
            className="text-8xl md:text-9xl animate-float select-none drop-shadow-[0_18px_24px_rgba(255,255,255,0.45)]"
            style={{ filter: `drop-shadow(0 18px 26px color-mix(in srgb, ${theme.accent} 24%, transparent))` }}
          >
            {emoji}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="metric-badge glass-card-light text-center">
              <RiDropLine className="text-frost-400 mx-auto text-base" />
              <span className="label-text">Humidity</span>
              <span className="text-lg font-mono font-semibold text-frost-200">{current.humidity}%</span>
            </div>
            <div className="metric-badge glass-card-light text-center">
              <RiWindyLine className="text-frost-400 mx-auto text-base" />
              <span className="label-text">Wind</span>
              <span className="text-lg font-mono font-semibold text-frost-200">{Math.round(current.wind_kph)} km/h</span>
            </div>
            <div className="metric-badge glass-card-light text-center">
              <RiEyeLine className="text-frost-400 mx-auto text-base" />
              <span className="label-text">Visibility</span>
              <span className="text-lg font-mono font-semibold text-frost-200">{current.vis_km} km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroWeather
