import { useState, useEffect } from 'react'
import { getWeatherRegions } from '@/services/weather-service'

const WEATHER_REGIONS = getWeatherRegions()

export function useWeatherParams() {
  const [regionCode, setRegionCode] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('region') || 'HK'
  })

  const [language, setLanguage] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('lang') || 'en'
  })

  const selectedRegion = WEATHER_REGIONS.find((r) => r.code === regionCode) || WEATHER_REGIONS[0]
  const supportsLanguage = Boolean(selectedRegion.languages?.length)

  useEffect(() => {
    const params = new URLSearchParams()
    params.set('region', regionCode)
    
    if (supportsLanguage && language) {
      params.set('lang', language)
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, '', newUrl)
  }, [regionCode, language, supportsLanguage]) 

  const handleRegionChange = (code) => {
    setRegionCode(code)
    const nextRegion = WEATHER_REGIONS.find((r) => r.code === code)
    if (nextRegion && !nextRegion.languages?.length) {
      setLanguage('')
    }
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
  }

  return {
    regionCode,
    language,
    selectedRegion,
    supportsLanguage,
    handleRegionChange,
    handleLanguageChange,
  }
}