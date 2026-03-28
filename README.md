# 🌤️ Weather Intelligence Platform

A production-grade weather dashboard built with **React**, **Vite**, **Axios**, **TailwindCSS**, and the **WeatherAPI.com** free API.

## Features

- 🌡️ **Current Conditions** — temperature, feels-like, humidity, wind, visibility
- 📅 **7-Day Forecast** — temperature range bars, rain chance, conditions
- ⏱️ **24-Hour Hourly Forecast** — scrollable with animated temperature bars
- 💨 **Air Quality** — EPA index, CO, NO₂, O₃, PM2.5, PM10, SO₂
- ☀️ **UV Index** — labeled scale with progress bar
- 🧭 **Wind Compass** — animated SVG compass with speed & gusts
- 🌅 **Sun & Moon** — arc visualization, rise/set times, moon phase
- ⚠️ **Weather Alerts** — collapsible severe weather warnings
- 📍 **Geolocation** — one-click "Use My Location"
- 🔍 **Autocomplete Search** — live city suggestions
- 🕐 **Search History** — persistent via localStorage
- ⭐ **Saved Locations** — bookmark and quick-switch cities
- 🌡️ **°C / °F Toggle** — unit switching throughout

## Quick Start

### 1. Get a Free API Key

Sign up at [weatherapi.com](https://www.weatherapi.com/) — free tier includes all features used here.

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Your API Key

```bash
cp .env
# Edit .env and replace `your_api_key_here` with your actual key
```

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── AirQuality.jsx        # Air quality metrics & pollutants
│   ├── DailyForecast.jsx     # 7-day forecast with range bars
│   ├── ErrorMessage.jsx      # Error state UI
│   ├── Header.jsx            # Sticky header with search
│   ├── HeroWeather.jsx       # Main current weather display
│   ├── HourlyForecast.jsx    # 24h scrollable hourly forecast
│   ├── LoadingSkeleton.jsx   # Shimmer loading placeholders
│   ├── MetricsGrid.jsx       # Detailed metrics cards
│   ├── SavedLocations.jsx    # Bookmarked cities with live temps
│   ├── SearchBar.jsx         # Autocomplete search input
│   ├── SunMoon.jsx           # Astronomy (sunrise/sunset/moon)
│   ├── WeatherAlerts.jsx     # Collapsible weather alerts
│   ├── WelcomeScreen.jsx     # Initial empty state
│   └── WindCompass.jsx       # Animated SVG wind compass
├── context/
│   └── WeatherContext.jsx    # Global state (React Context)
├── hooks/
│   ├── useDebounce.js        # Debounce hook for search input
│   └── useGeoLocation.js     # Geolocation hook
├── services/
│   └── weatherApi.js         # Axios API calls (WeatherAPI.com)
├── utils/
│   └── helpers.js            # Formatters, label mappers, math
├── App.jsx                   # Root component & layout
├── index.css                 # Tailwind + custom CSS
└── main.jsx                  # React entry point
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_WEATHER_API_KEY` | Your WeatherAPI.com API key |
