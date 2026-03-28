import React from 'react'
import { useWeather } from '../context/WeatherContext'
import { getAQILabel, toPercent } from '../utils/helpers'

const pollutants = [
  { key: 'co',   label: 'CO',    unit: 'μg/m³', max: 15400 },
  { key: 'no2',  label: 'NO₂',   unit: 'μg/m³', max: 200   },
  { key: 'o3',   label: 'O₃',    unit: 'μg/m³', max: 180   },
  { key: 'pm2_5',label: 'PM2.5', unit: 'μg/m³', max: 75    },
  { key: 'pm10', label: 'PM10',  unit: 'μg/m³', max: 150   },
  { key: 'so2',  label: 'SO₂',   unit: 'μg/m³', max: 350   },
]

const AirQuality = () => {
  const { weather } = useWeather()
  if (!weather) return null

  const aqi = weather.current.air_quality
  if (!aqi) return null

  const epa     = aqi['us-epa-index']
  const aqiInfo = getAQILabel(epa)

  return (
    <div className="glass-card p-5 animate-fade-in-up">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-lg font-semibold text-frost-100">Air Quality</h2>
        <span
          className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
          style={{ background: `${aqiInfo.color}22`, color: aqiInfo.color, border: `1px solid ${aqiInfo.color}44` }}
        >
          {aqiInfo.label}
        </span>
      </div>

      {/* EPA Scale */}
      <div className="mb-5">
        <div className="flex justify-between mb-1">
          <span className="label-text">US EPA Index</span>
          <span className="font-mono text-xs text-frost-200">{epa} / 6</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden flex">
          {['#10b981','#f59e0b','#f97316','#ef4444','#8b5cf6','#be123c'].map((c, i) => (
            <div
              key={i}
              className="flex-1 transition-opacity duration-500"
              style={{ background: c, opacity: i < epa ? 1 : 0.2 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-xs font-mono text-frost-300/40">
          <span>Good</span><span>Hazardous</span>
        </div>
      </div>

      {/* Pollutants */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {pollutants.map(({ key, label, unit, max }) => {
          const val = aqi[key]
          if (val === undefined) return null
          const pct = toPercent(val, max)
          const color = pct < 33 ? '#10b981' : pct < 66 ? '#f59e0b' : '#ef4444'
          return (
            <div key={key} className="glass-card-light p-3 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="label-text">{label}</span>
                <span className="text-xs font-mono text-frost-200">{Math.round(val)}</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: color }} />
              </div>
              <span className="text-xs text-frost-300/40 mt-1 block">{unit}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AirQuality
