import { useState, useEffect } from 'react'

/**
 * Debounce a rapidly-changing value
 * @param {*}      value - the value to debounce
 * @param {number} delay - milliseconds
 */
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

export default useDebounce
