import { useWeather } from '../context/WeatherContext'
import useGeoLocation from '../hooks/useGeoLocation'
import { RiMapPinLine, RiLoader4Line } from 'react-icons/ri'

const popular = [
  'New York', 'London', 'Tokyo', 'Paris',
  'Sydney', 'Dubai', 'Singapore', 'Mumbai',
]

const WelcomeScreen = () => {
  const { searchWeather, searchHistory } = useWeather()
  const { getLocation, geoLoading } = useGeoLocation()

  const handleGeo = async () => {
    try {
      const coords = await getLocation()
      searchWeather(coords)
    } catch {}
  }

  return (
    <div className="flex flex-col items-center gap-8 py-10 animate-fade-in">
      <div className="glass-card w-full max-w-3xl overflow-hidden px-6 py-10 text-center md:px-10">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] text-6xl animate-float"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-soft) 88%, white), color-mix(in srgb, var(--accent) 16%, white))',
            boxShadow: '0 18px 40px color-mix(in srgb, var(--accent) 16%, transparent)',
          }}
        >
          🌤️
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-frost-100 mb-2">
          Weather Intelligence
        </h2>
        <p className="text-frost-300/80 mx-auto max-w-xl text-sm leading-relaxed md:text-base">
          Real-time forecasts, air quality, UV index, and a weather-reactive interface that shifts tone with the sky above your city.
        </p>
      </div>

      <button
        onClick={handleGeo}
        disabled={geoLoading}
        className="btn-primary flex items-center gap-2 text-white"
      >
        {geoLoading
          ? <><RiLoader4Line className="animate-spin" /> Detecting…</>
          : <><RiMapPinLine /> Use My Location</>}
      </button>

      {searchHistory.length > 0 && (
        <div className="w-full max-w-lg">
          <p className="label-text text-center mb-3">Recent</p>
          <div className="flex flex-wrap justify-center gap-2">
            {searchHistory.slice(0, 6).map((city, i) => (
              <button
                key={i}
                onClick={() => searchWeather(city)}
                className="weather-chip rounded-full px-4 py-1.5 text-sm transition-all hover:-translate-y-0.5 hover:text-frost-100"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-lg">
        <p className="label-text text-center mb-3">Popular Cities</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popular.map((city) => (
            <button
              key={city}
              onClick={() => searchWeather(city)}
              className="weather-chip rounded-full px-4 py-1.5 text-sm transition-all hover:-translate-y-0.5 hover:text-frost-100"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
