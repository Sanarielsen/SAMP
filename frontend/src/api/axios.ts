import axios from 'axios'

export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
}

export const api = axios.create({
  baseURL: config.apiUrl,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/"
    }

    return Promise.reject(error)
  }
)