import { apiClient } from './api-client'

export async function getWeather({ region, lang }) {
  const params = { region }

  if (lang) {
    params.lang = lang
  }

  const { data } = await apiClient.get('/weather', { params })

  return data
}
