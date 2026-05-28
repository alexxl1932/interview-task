import { useEffect, useMemo, useState } from 'react'
import { WeatherShell } from '@/components/weather/weather-shell'
import { getWeather, getWeatherRegions } from '@/services/weather-service'

const WEATHER_REGIONS = getWeatherRegions()

function App() {
  const [regionCode, setRegionCode] = useState('HK')
  const [language, setLanguage] = useState('tc')
  const [rawWeather, setRawWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedRegion = useMemo(
    () => WEATHER_REGIONS.find((region) => region.code === regionCode) ?? WEATHER_REGIONS[0],
    [regionCode],
  )
  const supportsLanguage = Boolean(selectedRegion.languages?.length)

  useEffect(() => {
    let isActive = true

    async function loadWeather() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getWeather({
          region: regionCode,
          lang: supportsLanguage ? language : undefined,
        })

        if (isActive) {
          setRawWeather(data.weather)
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : 'Failed to load weather')
          setRawWeather(null)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadWeather()

    return () => {
      isActive = false
    }
  }, [regionCode, language, supportsLanguage])

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
    />
  )
}

export default App
