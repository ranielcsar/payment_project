import { getTokenFromLocalStorage } from '@/utils/localStorage'
import axios from 'axios'

// import { getTokenFromLocalStorage } from '@/utils/localStorage'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.request.use(async (config) => {
  const token = getTokenFromLocalStorage()

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})
