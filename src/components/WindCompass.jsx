import React from 'react'
import { useWeather } from '../context/WeatherContext'
import { degToCompass } from '../utils/helpers'

const WindCompass = () => {
  const { weather } = useWeather()
  if (!weather) return null

  const { wind_degree, wind_kph, gust_kph, wind_dir } = weather.current

  const needleStyle = {
    transform: `rotate(${wind_degree}deg)`,
    transformOrigin: '50% 50%',
    transition: 'transform 1s ease',
  }

  return (
    <div className="glass-card p-5 animate-fade-in-up flex flex-col items-center gap-4">
      <h2 className="font-display text-lg font-semibold text-frost-100 self-start">Wind Compass</h2>

      {/* Compass SVG */}
      <svg viewBox="0 0 160 160" className="w-36 h-36">
        {/* Outer ring */}
        <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />

        {/* Cardinal labels */}
        {[['N',80,18],['E',142,84],['S',80,150],['W',18,84]].map(([l,x,y]) => (
          <text key={l} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize="10" fill="rgba(224,242,254,0.5)" fontFamily="JetBrains Mono">
            {l}
          </text>
        ))}

        {/* Tick marks */}
        {Array.from({length:36}).map((_,i) => {
          const a = (i * 10 * Math.PI) / 180
          const r1 = i % 9 === 0 ? 52 : 56
          return (
            <line key={i}
              x1={80 + r1 * Math.sin(a)} y1={80 - r1 * Math.cos(a)}
              x2={80 + 60 * Math.sin(a)} y2={80 - 60 * Math.cos(a)}
              stroke="rgba(255,255,255,0.15)" strokeWidth={i % 9 === 0 ? 1.5 : 0.5}
            />
          )
        })}

        {/* Needle */}
        <g style={needleStyle}>
          {/* North (colored) */}
          <polygon points="80,28 76,80 84,80" fill="#38bdf8" opacity="0.9" />
          {/* South (muted) */}
          <polygon points="80,132 76,80 84,80" fill="rgba(255,255,255,0.2)" />
        </g>

        {/* Center dot */}
        <circle cx="80" cy="80" r="5" fill="#0ea5e9" />
        <circle cx="80" cy="80" r="2.5" fill="#e0f2fe" />
      </svg>

      {/* Stats */}
      <div className="w-full grid grid-cols-3 gap-2 text-center">
        <div className="glass-card-light p-2 rounded-lg">
          <div className="label-text">Speed</div>
          <div className="font-mono text-sm text-frost-200">{Math.round(wind_kph)} km/h</div>
        </div>
        <div className="glass-card-light p-2 rounded-lg">
          <div className="label-text">Dir</div>
          <div className="font-mono text-sm text-frost-200">{wind_dir}</div>
        </div>
        <div className="glass-card-light p-2 rounded-lg">
          <div className="label-text">Gust</div>
          <div className="font-mono text-sm text-frost-200">{Math.round(gust_kph)} km/h</div>
        </div>
      </div>
    </div>
  )
}

export default WindCompass
