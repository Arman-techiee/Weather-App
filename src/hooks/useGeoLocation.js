import { useState, useCallback } from 'react'

/**
 * Hook to get user's current geolocation as "lat,lon" string
 */
const useGeoLocation = () => {
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError]     = useState(null)

  const getLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = 'Geolocation is not supported by your browser.'
        setGeoError(err)
        reject(err)
        return
      }
      setGeoLoading(true)
      setGeoError(null)
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeoLoading(false)
          resolve(`${pos.coords.latitude},${pos.coords.longitude}`)
        },
        (err) => {
          setGeoLoading(false)
          const msg = 'Location access denied. Please search manually.'
          setGeoError(msg)
          reject(msg)
        },
        { timeout: 10000 }
      )
    })
  }, [])

  return { getLocation, geoLoading, geoError }
}

export default useGeoLocation
