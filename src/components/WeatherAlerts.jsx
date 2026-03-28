import React, { useState } from 'react'
import { RiAlertLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { useWeather } from '../context/WeatherContext'

const AlertItem = ({ alert }) => {
  const [open, setOpen] = useState(false)

  const severity = alert.severity?.toLowerCase()
  const color =
    severity === 'extreme'  ? '#be123c' :
    severity === 'severe'   ? '#ef4444' :
    severity === 'moderate' ? '#f97316' : '#f59e0b'

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all duration-300"
      style={{ borderColor: `${color}40`, background: `${color}10` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <RiAlertLine style={{ color }} className="shrink-0 text-lg" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-frost-100 truncate">{alert.headline || alert.event}</div>
          <div className="text-xs font-mono text-frost-300/50 mt-0.5">{alert.areas}</div>
        </div>
        {open ? <RiArrowUpSLine className="text-frost-300/70" /> : <RiArrowDownSLine className="text-frost-300/70" />}
      </button>

      {open && (
        <div className="px-4 pb-4 pt-3 text-sm leading-relaxed text-frost-200/85" style={{ borderTop: '1px solid var(--line-soft)' }}>
          {alert.desc || alert.instruction || 'No additional details available.'}
        </div>
      )}
    </div>
  )
}

const WeatherAlerts = () => {
  const { weather } = useWeather()
  if (!weather) return null

  const alerts = weather.alerts?.alert
  if (!alerts || alerts.length === 0) return null

  return (
    <div className="glass-card p-5 animate-fade-in-up" style={{ borderColor: 'color-mix(in srgb, #dc2626 22%, var(--line-soft))' }}>
      <div className="flex items-center gap-2 mb-4">
        <RiAlertLine className="text-aurora-coral text-lg" />
        <h2 className="font-display text-lg font-semibold text-frost-100">
          Weather Alerts ({alerts.length})
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {alerts.map((a, i) => <AlertItem key={i} alert={a} />)}
      </div>
    </div>
  )
}

export default WeatherAlerts
