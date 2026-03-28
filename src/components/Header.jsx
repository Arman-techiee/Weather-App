import { RiCloudLine } from 'react-icons/ri'
import { useWeather } from '../context/WeatherContext'
import SearchBar from './SearchBar'

const Header = () => {
  const { unit, toggleUnit } = useWeather()

  return (
    <header className="sticky top-0 z-40 w-full" style={{ backdropFilter: 'blur(20px)' }}>
      <div
        className="border-b surface-divider"
        style={{ background: 'color-mix(in srgb, var(--surface-strong) 88%, white)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-base shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-strong))',
                boxShadow: '0 12px 24px color-mix(in srgb, var(--accent) 28%, transparent)',
              }}
            >
              <RiCloudLine className="text-white" />
            </div>
            <span className="font-display font-semibold text-frost-100 hidden sm:block whitespace-nowrap">
              Weather<span className="text-frost-400">IQ</span>
            </span>
          </div>

          <div className="flex-1">
            <SearchBar />
          </div>

          <button
            onClick={toggleUnit}
            className="weather-chip shrink-0 px-3 py-2 rounded-xl text-xs font-mono transition-all hover:-translate-y-0.5"
          >
            °{unit === 'C' ? 'F' : 'C'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
