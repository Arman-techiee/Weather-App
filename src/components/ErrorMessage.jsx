import React from 'react'
import { RiAlertLine, RiRefreshLine } from 'react-icons/ri'
import { useWeather } from '../context/WeatherContext'

const ErrorMessage = () => {
  const { error, searchWeather, searchHistory } = useWeather()
  if (!error) return null

  const lastCity = searchHistory[0]

  return (
    <div className="glass-card border-aurora-coral/30 p-8 flex flex-col items-center gap-4 text-center animate-fade-in-up">
      <div className="text-5xl">⚠️</div>
      <div>
        <h3 className="font-display text-xl font-semibold text-frost-100 mb-2">Something went wrong</h3>
        <p className="text-frost-300/60 text-sm max-w-md">{error}</p>
      </div>
      {lastCity && (
        <button
          onClick={() => searchWeather(lastCity)}
          className="btn-primary flex items-center gap-2"
        >
          <RiRefreshLine /> Retry "{lastCity}"
        </button>
      )}
      <p className="text-xs text-frost-300/30 font-mono">
        Make sure your API key is set in <code className="text-frost-300/50">.env</code> as{' '}
        <code className="text-frost-300/50">VITE_WEATHER_API_KEY</code>
      </p>
    </div>
  )
}

export default ErrorMessage
