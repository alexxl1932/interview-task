import { useEffect, useMemo, useState } from 'react'
import { WeatherShell } from '@/components/weather/weather-shell'
import { getWeather, getWeatherRegions } from '@/services/weather-service'

const WEATHER_REGIONS = getWeatherRegions()

function App() {
  const [regionCode, setRegionCode] = useState('HK')
  const [language, setLanguage] = useState('en')
  const [rawWeather, setRawWeather] = useState(null)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const selectedRegion = useMemo(
    () => WEATHER_REGIONS.find((region) => region.code === regionCode) ?? WEATHER_REGIONS[0],
    [regionCode],
  )
  const supportsLanguage = Boolean(selectedRegion.languages?.length)
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
      onLanguageChange={setLanguage}
      onRegionChange={setRegionCode}
      onRetry={() => setRetryCount((c) => c + 1)}
    />
  )
}

export default App
