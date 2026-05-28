import { apiClient } from '@/lib/api-client'

const WEATHER_REGIONS = [
  {
    code: 'HK',
    name: 'Hong Kong',
    source: 'Hong Kong Observatory',
    languages: [
      { code: 'tc', label: 'Traditional Chinese' },
      { code: 'sc', label: 'Simplified Chinese' },
      { code: 'en', label: 'English' },
    ],
  },
  {
    code: 'JP',
    name: 'Japan',
    source: 'Japan Meteorological Agency',
  },
  {
    code: 'SG',
    name: 'Singapore',
    source: 'National Environment Agency / data.gov.sg',
  },
]

export function getWeatherRegions() {
  return WEATHER_REGIONS
}

export async function getWeather({ region, lang }) {
  const params = { region }

  if (lang) {
    params.lang = lang
  }

  const { data } = await apiClient.get('/weather', { params })

  return data
}
