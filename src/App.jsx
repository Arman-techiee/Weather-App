import { WeatherProvider, useWeather } from './context/WeatherContext'
import Header from './components/Header'
import HeroWeather from './components/HeroWeather'
import MetricsGrid from './components/MetricsGrid'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import AirQuality from './components/AirQuality'
import SunMoon from './components/SunMoon'
import WindCompass from './components/WindCompass'
import WeatherAlerts from './components/WeatherAlerts'
import SavedLocations from './components/SavedLocations'
import LoadingSkeleton from './components/LoadingSkeleton'
import ErrorMessage from './components/ErrorMessage'
import WelcomeScreen from './components/WelcomeScreen'
import { getWeatherTheme } from './utils/helpers'

function WeatherContent() {
  const { weather, loading, error } = useWeather()

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorMessage />
  }

  if (!weather) {
    return <WelcomeScreen />
  }

  return (
    <div className="flex flex-col gap-5">
      <WeatherAlerts />
      <HeroWeather />
      <MetricsGrid />
      <HourlyForecast />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <DailyForecast />
          <AirQuality />
        </div>
        <div className="flex flex-col gap-5">
          <SunMoon />
          <WindCompass />
          <SavedLocations />
        </div>
      </div>
    </div>
  )
}

function AppShell() {
  const { weather } = useWeather()
  const theme = weather
    ? getWeatherTheme(weather.current.condition.code, weather.current.is_day)
    : { name: 'default', accent: '#4f83ff', glow: '#93c5fd' }

  return (
    <div
      className={`weather-app theme-${theme.name}`}
      style={{
        '--hero-accent': theme.accent,
        '--hero-glow': theme.glow,
      }}
    >
      <div className="weather-backdrop" aria-hidden="true">
        <div className="weather-orb weather-orb--a" />
        <div className="weather-orb weather-orb--b" />
        <div className="weather-orb weather-orb--c" />
      </div>
      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6">
          <WeatherContent />
        </main>
        <footer className="py-8 text-center font-mono text-xs text-frost-300/70">
          <span>Powered by WeatherAPI.com · Weather Intelligence Platform</span>
          <span className="mx-2 text-frost-300/40">·</span>
          <a
            href="https://github.com/Arman-techiee/Weather-App.git"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-frost-100"
          >
            Original project on GitHub
          </a>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <WeatherProvider>
      <AppShell />
    </WeatherProvider>
  )
}

export default App
