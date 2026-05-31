import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message ?? `Request failed with status ${error.response.status}`
      return Promise.reject({ message, status: error.response.status })
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ message: 'Request timed out. Please try again.', status: 0 })
    }

    return Promise.reject({ message: 'Network error. Please check your connection.', status: 0 })
  },
)
