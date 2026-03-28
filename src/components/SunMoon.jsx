import React from 'react'
import { useWeather } from '../context/WeatherContext'

const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0
  const clean = timeStr.replace(/\s?(AM|PM)/i, '')
  const [h, m] = clean.split(':').map(Number)
  const isPM = /PM/i.test(timeStr)
  return (isPM && h !== 12 ? h + 12 : !isPM && h === 12 ? 0 : h) * 60 + (m || 0)
}

const Arc = ({ rise, set, label, color, emoji }) => {
  const riseMin = timeToMinutes(rise)
  const setMin  = timeToMinutes(set)
  const total   = 24 * 60
  const riseAngle = (riseMin / total) * 360 - 90
  const setAngle  = (setMin  / total) * 360 - 90
  const now       = new Date()
  const nowMin    = now.getHours() * 60 + now.getMinutes()
  const nowAngle  = (nowMin / total) * 360 - 90

  const toXY = (angle, r = 70) => ({
    x: 90 + r * Math.cos((angle * Math.PI) / 180),
    y: 90 + r * Math.sin((angle * Math.PI) / 180),
  })

  const riseP  = toXY(riseAngle)
  const setP   = toXY(setAngle)
  const nowP   = toXY(nowAngle)
  const large  = Math.abs(setAngle - riseAngle) > 180 ? 1 : 0

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 180 180" className="w-36 h-36">
        {/* Outer ring */}
        <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
        {/* Active arc */}
        <path
          d={`M ${riseP.x} ${riseP.y} A 70 70 0 ${large} 1 ${setP.x} ${setP.y}`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Now indicator */}
        <circle cx={nowP.x} cy={nowP.y} r="5" fill={color} />
        {/* Center emoji */}
        <text x="90" y="97" textAnchor="middle" fontSize="28">{emoji}</text>
      </svg>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="label-text">Rise</div>
          <div className="font-mono text-sm text-frost-200">{rise || '--'}</div>
        </div>
        <div>
          <div className="label-text">Set</div>
          <div className="font-mono text-sm text-frost-200">{set || '--'}</div>
        </div>
      </div>
    </div>
  )
}

const SunMoon = () => {
  const { weather } = useWeather()
  if (!weather) return null

  const astro = weather.forecast.forecastday[0].astro

  return (
    <div className="glass-card p-5 animate-fade-in-up">
      <h2 className="font-display text-lg font-semibold text-frost-100 mb-5">Sun & Moon</h2>
      <div className="grid grid-cols-2 gap-6">
        <Arc
          rise={astro.sunrise}
          set={astro.sunset}
          label="Sun"
          color="#f59e0b"
          emoji="☀️"
        />
        <Arc
          rise={astro.moonrise}
          set={astro.moonset}
          label="Moon"
          color="#94a3b8"
          emoji="🌙"
        />
      </div>
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-center">
        <div>
          <div className="label-text">Moon Phase</div>
          <div className="text-sm text-frost-200 mt-0.5">{astro.moon_phase}</div>
        </div>
        <div>
          <div className="label-text">Moon Illumination</div>
          <div className="text-sm text-frost-200 mt-0.5">{astro.moon_illumination}%</div>
        </div>
      </div>
    </div>
  )
}

export default SunMoon
