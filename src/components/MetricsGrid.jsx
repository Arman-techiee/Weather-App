import React from 'react'
import {
  RiTempHotLine, RiWindyLine, RiDropLine, RiSunLine,
  RiCloudLine, RiBarChartLine, RiArrowUpLine, RiArrowDownLine
} from 'react-icons/ri'
import { useWeather } from '../context/WeatherContext'
import { getUVLabel, getAQILabel, degToCompass, toPercent } from '../utils/helpers'

const MetricCard = ({ icon, label, value, sub, color, bar, barColor }) => (
  <div className="glass-card p-5 flex flex-col gap-3 animate-fade-in-up hover:border-white/20 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg" style={{ color }}>{icon}</span>
        <span className="label-text">{label}</span>
      </div>
    </div>
    <div>
      <div className="font-display text-2xl font-semibold text-frost-100">{value}</div>
      {sub && <div className="text-xs text-frost-300/50 mt-0.5">{sub}</div>}
    </div>
    {bar !== undefined && (
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${bar}%`, background: barColor || color }}
        />
      </div>
    )}
  </div>
)

const MetricsGrid = () => {
  const { weather, unit } = useWeather()
  if (!weather) return null

  const { current, forecast } = weather
  const today = forecast.forecastday[0].day
  const aqi   = current.air_quality?.['us-epa-index']
  const uvInfo = getUVLabel(current.uv)
  const aqiInfo = aqi ? getAQILabel(aqi) : null

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* UV Index */}
      <MetricCard
        icon={<RiSunLine />}
        label="UV Index"
        value={`${current.uv} · ${uvInfo.label}`}
        sub="Daily maximum"
        color={uvInfo.color}
        bar={toPercent(current.uv, 11)}
        barColor={uvInfo.color}
      />

      {/* Air Quality */}
      {aqiInfo && (
        <MetricCard
          icon={<RiCloudLine />}
          label="Air Quality"
          value={aqiInfo.label}
          sub={`EPA Index: ${aqi}`}
          color={aqiInfo.color}
          bar={toPercent(aqi, 6)}
          barColor={aqiInfo.color}
        />
      )}

      {/* Pressure */}
      <MetricCard
        icon={<RiBarChartLine />}
        label="Pressure"
        value={`${current.pressure_mb} mb`}
        sub={current.pressure_mb > 1013 ? 'High pressure' : 'Low pressure'}
        color="#38bdf8"
      />

      {/* Cloud Cover */}
      <MetricCard
        icon={<RiCloudLine />}
        label="Cloud Cover"
        value={`${current.cloud}%`}
        sub="Sky coverage"
        color="#7dd3fc"
        bar={current.cloud}
        barColor="#7dd3fc"
      />

      {/* Precipitation */}
      <MetricCard
        icon={<RiDropLine />}
        label="Precipitation"
        value={`${current.precip_mm} mm`}
        sub={`Today total: ${today.totalprecip_mm} mm`}
        color="#0ea5e9"
        bar={toPercent(today.totalprecip_mm, 50)}
        barColor="#0ea5e9"
      />

      {/* Wind Direction */}
      <MetricCard
        icon={<RiWindyLine />}
        label="Wind"
        value={`${Math.round(current.wind_kph)} km/h`}
        sub={`${degToCompass(current.wind_degree)} · Gust ${Math.round(current.gust_kph)} km/h`}
        color="#14b8a6"
      />

      {/* High / Low */}
      <MetricCard
        icon={<RiTempHotLine />}
        label="High / Low"
        value={
          unit === 'C'
            ? `${Math.round(today.maxtemp_c)}° / ${Math.round(today.mintemp_c)}°`
            : `${Math.round(today.maxtemp_f)}° / ${Math.round(today.mintemp_f)}°`
        }
        sub="Today's range"
        color="#f59e0b"
      />

      {/* Dew Point */}
      <MetricCard
        icon={<RiDropLine />}
        label="Dew Point"
        value={unit === 'C' ? `${current.dewpoint_c ?? '--'}°C` : `${current.dewpoint_f ?? '--'}°F`}
        sub="Moisture in air"
        color="#10b981"
        bar={current.humidity}
        barColor="#10b981"
      />
    </div>
  )
}

export default MetricsGrid
