/**
 * Map WeatherAPI condition code → emoji icon
 */
export const getWeatherEmoji = (code, isDay = 1) => {
  if (code === 1000) return isDay ? '☀️' : '🌙'
  if ([1003].includes(code)) return isDay ? '⛅' : '🌙'
  if ([1006, 1009].includes(code)) return '☁️'
  if ([1030, 1135, 1147].includes(code)) return '🌫️'
  if ([1063, 1150, 1153, 1180, 1183].includes(code)) return '🌦️'
  if ([1186, 1189, 1192, 1195, 1243, 1246].includes(code)) return '🌧️'
  if ([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return '🌨️'
  if ([1069, 1204, 1207, 1249, 1252].includes(code)) return '🌨️'
  if ([1072, 1168, 1171, 1198, 1201].includes(code)) return '🌧️'
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return '⛈️'
  if ([1114, 1117].includes(code)) return '🌬️'
  return '🌡️'
}

/**
 * UV Index label
 */
export const getUVLabel = (uv) => {
  if (uv <= 2)  return { label: 'Low',       color: '#10b981' }
  if (uv <= 5)  return { label: 'Moderate',  color: '#f59e0b' }
  if (uv <= 7)  return { label: 'High',      color: '#f97316' }
  if (uv <= 10) return { label: 'Very High', color: '#ef4444' }
  return           { label: 'Extreme',   color: '#8b5cf6' }
}

/**
 * Air quality index label
 */
export const getAQILabel = (aqi) => {
  if (aqi === 1) return { label: 'Good',        color: '#10b981' }
  if (aqi === 2) return { label: 'Moderate',    color: '#f59e0b' }
  if (aqi === 3) return { label: 'Unhealthy*',  color: '#f97316' }
  if (aqi === 4) return { label: 'Unhealthy',   color: '#ef4444' }
  if (aqi === 5) return { label: 'Very Unhealthy', color: '#8b5cf6' }
  return           { label: 'Hazardous',     color: '#be123c' }
}

/**
 * Wind direction degree → compass label
 */
export const degToCompass = (deg) => {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
  return dirs[Math.round(deg / 22.5) % 16]
}

/**
 * Format epoch to time string
 */
export const formatTime = (epoch) =>
  new Date(epoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

/**
 * Format date string to short weekday
 */
export const formatDay = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString([], { weekday: 'short' })
}

/**
 * Clamp a value between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

/**
 * Calculate % for progress bars
 */
export const toPercent = (val, max) => Math.round(clamp((val / max) * 100, 0, 100))

export const getWeatherTheme = (code, isDay = 1) => {
  if (!isDay) {
    return {
      name: 'night',
      accent: '#6d7cff',
      accentSoft: '#b9c2ff',
      glow: '#8f9cff',
    }
  }

  if (code === 1000) {
    return {
      name: 'sunny',
      accent: '#f59e0b',
      accentSoft: '#fcd34d',
      glow: '#fdba74',
    }
  }

  if ([1003, 1006, 1009].includes(code)) {
    return {
      name: 'cloudy',
      accent: '#4f83ff',
      accentSoft: '#bfdbfe',
      glow: '#93c5fd',
    }
  }

  if ([1030, 1135, 1147].includes(code)) {
    return {
      name: 'misty',
      accent: '#5b8def',
      accentSoft: '#dbeafe',
      glow: '#cbd5e1',
    }
  }

  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1243, 1246].includes(code)) {
    return {
      name: 'rainy',
      accent: '#0f766e',
      accentSoft: '#99f6e4',
      glow: '#5eead4',
    }
  }

  if ([1066, 1069, 1072, 1114, 1117, 1168, 1171, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1249, 1252, 1255, 1258].includes(code)) {
    return {
      name: 'snowy',
      accent: '#3b82f6',
      accentSoft: '#e0f2fe',
      glow: '#bae6fd',
    }
  }

  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return {
      name: 'stormy',
      accent: '#7c3aed',
      accentSoft: '#ddd6fe',
      glow: '#c4b5fd',
    }
  }

  return {
    name: 'sunny',
    accent: '#2563eb',
    accentSoft: '#bfdbfe',
    glow: '#93c5fd',
  }
}
