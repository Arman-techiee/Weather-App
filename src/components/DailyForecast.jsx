import React from 'react'
import { useWeather } from '../context/WeatherContext'
import { getWeatherEmoji, formatDay, toPercent } from '../utils/helpers'
import { RiDropLine } from 'react-icons/ri'

const DailyForecast = () => {
  const { weather, unit } = useWeather()
  if (!weather) return null

  const { forecastday } = weather.forecast
  const allTemps = forecastday.flatMap((d) => [
    unit === 'C' ? d.day.mintemp_c : d.day.mintemp_f,
    unit === 'C' ? d.day.maxtemp_c : d.day.maxtemp_f,
  ])
  const absMin = Math.min(...allTemps)
  const absMax = Math.max(...allTemps)
  const pct    = (t) => toPercent(t - absMin, absMax - absMin)

  return (
    <div className="glass-card p-5 animate-fade-in-up">
      <h2 className="font-display text-lg font-semibold text-frost-100 mb-4">
        {forecastday.length}-Day Forecast
      </h2>

      <div className="flex flex-col gap-1">
        {forecastday.map((d, i) => {
          const minT = unit === 'C' ? d.day.mintemp_c : d.day.mintemp_f
          const maxT = unit === 'C' ? d.day.maxtemp_c : d.day.maxtemp_f
          const left  = pct(minT)
          const right = 100 - pct(maxT)

          return (
            <div
              key={d.date}
              className="grid grid-cols-12 items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              {/* Day */}
              <div className="col-span-2 label-text">
                {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : formatDay(d.date)}
              </div>

              {/* Icon */}
              <div className="col-span-1 text-xl text-center">
                {getWeatherEmoji(d.day.condition.code, 1)}
              </div>

              {/* Rain chance */}
              <div className="col-span-2 flex items-center gap-1">
                <RiDropLine className="text-aurora-teal text-xs" />
                <span className="text-xs font-mono text-frost-300/60">{d.day.daily_chance_of_rain}%</span>
              </div>

              {/* Temp bar */}
              <div className="col-span-5 flex items-center gap-2">
                <span className="text-xs font-mono text-frost-300/50 w-8 text-right">{Math.round(minT)}°</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full"
                    style={{
                      left: `${left}%`,
                      right: `${right}%`,
                      background: 'linear-gradient(90deg, #38bdf8, #f59e0b)',
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-frost-200 w-8">{Math.round(maxT)}°</span>
              </div>

              {/* Condition */}
              <div className="col-span-2 hidden md:block">
                <span className="text-xs text-frost-300/40 truncate">{d.day.condition.text}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyForecast
