import React, { useRef } from 'react'
import { useWeather } from '../context/WeatherContext'
import { getWeatherEmoji, formatTime } from '../utils/helpers'

const HourlyForecast = () => {
  const { weather, unit } = useWeather()
  const scrollRef = useRef(null)
  if (!weather) return null

  const hours = weather.forecast.forecastday
    .flatMap((d) => d.hour)
    .filter((h) => h.time_epoch * 1000 >= Date.now() - 3600000)
    .slice(0, 24)

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' })
  }

  // Find min/max for bar height normalization
  const temps  = hours.map((h) => (unit === 'C' ? h.temp_c : h.temp_f))
  const minT   = Math.min(...temps)
  const maxT   = Math.max(...temps)
  const norm   = (t) => maxT === minT ? 50 : Math.round(((t - minT) / (maxT - minT)) * 60 + 20)

  return (
    <div className="glass-card p-5 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-frost-100">24-Hour Forecast</h2>
        <div className="flex gap-1">
          <button onClick={() => scroll(-1)} className="p-1.5 rounded-lg hover:bg-white/10 text-frost-300/50 hover:text-frost-200 transition-colors text-sm">←</button>
          <button onClick={() => scroll(1)}  className="p-1.5 rounded-lg hover:bg-white/10 text-frost-300/50 hover:text-frost-200 transition-colors text-sm">→</button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {hours.map((h, i) => {
          const t    = unit === 'C' ? h.temp_c : h.temp_f
          const barH = norm(t)
          const isNow = i === 0
          return (
            <div
              key={h.time_epoch}
              className={`flex flex-col items-center gap-2 shrink-0 px-3 py-3 rounded-xl transition-colors
                ${isNow ? 'bg-sky-light/20 border border-sky-light/30' : 'hover:bg-white/5'}`}
            >
              <span className="label-text whitespace-nowrap">
                {isNow ? 'Now' : formatTime(h.time_epoch)}
              </span>
              <span className="text-xl">{getWeatherEmoji(h.condition.code, h.is_day)}</span>
              <div className="flex flex-col items-center gap-1">
                <div className="w-1.5 rounded-full" style={{ height: `${barH}px`, background: 'linear-gradient(180deg, #38bdf8, #0ea5e9)' }} />
              </div>
              <span className="font-mono text-sm font-medium text-frost-200">
                {Math.round(t)}°
              </span>
              {h.chance_of_rain > 10 && (
                <span className="text-xs text-aurora-teal font-mono">{h.chance_of_rain}%</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HourlyForecast
