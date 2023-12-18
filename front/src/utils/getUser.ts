import { jwtDecode } from 'jwt-decode'
import { getTokenFromLocalStorage } from './localStorage'
import { UserProps } from '@/types/auth'

export function getUser() {
  const token = getTokenFromLocalStorage()

  if (!token) {
    throw new Error('Unauthorized')
  }

  const user = jwtDecode<UserProps>(token)

  return { user }
}
