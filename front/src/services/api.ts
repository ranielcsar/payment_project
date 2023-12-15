import axios from 'axios'

// import { getTokenFromLocalStorage } from '@/utils/localStorage'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.request.use(async (config) => {
  const token = // getTokenFromLocalStorage()
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFuaWVsIiwic3ViIjoiOTAwZWM2ODItMTY2NS00ZDZiLWIwN2QtMzVlMTE5YTcxMTM3IiwiaWF0IjoxNzAyNjU4MDE0LCJleHAiOjE3MDUyNTAwMTR9.AWAM8SKUbdmpVBTxXdooNWeLvYRZQOiEFoMdORL8LVE'

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})
