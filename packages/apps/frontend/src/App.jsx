import { useEffect, useState } from 'react'
import { WeatherShell } from '@/components/weather/weather-shell'
import { getWeather, getWeatherRegions } from '@/services/weather-service'
import { useWeatherParams } from '@/lib/use-weather-params'

const WEATHER_REGIONS = getWeatherRegions()

function App() {
  const {
    regionCode,
    language,
    selectedRegion,
    supportsLanguage,
    handleRegionChange,
    handleLanguageChange,
  } = useWeatherParams()

  const [rawWeather, setRawWeather] = useState(null)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const isLoading = !rawWeather && !error

  useEffect(() => {
    let cancelled = false

    getWeather({
      region: regionCode,
      lang: supportsLanguage ? language : undefined,
    }).then((data) => {
      if (cancelled) return
      setRawWeather(data.weather)
      setError(null)
    }).catch((err) => {
      if (cancelled) return
      const errorObj = typeof err === 'object' && err !== null ? err : { message: String(err) }
      setError({ message: errorObj.message ?? 'Failed to load weather', status: errorObj.status ?? 0 })
    })

    return () => { cancelled = true }
  }, [regionCode, language, supportsLanguage, retryCount])

  return (
    <WeatherShell
      error={error}
      isLoading={isLoading}
      language={language}
      rawWeather={rawWeather}
      region={selectedRegion}
      regions={WEATHER_REGIONS}
      onLanguageChange={handleLanguageChange}
      onRegionChange={handleRegionChange}
      onRetry={() => setRetryCount((c) => c + 1)}
    />
  )
}

export default App
