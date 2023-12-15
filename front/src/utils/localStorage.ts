const localKey = '@payment:token'

export function saveTokenOnLocalStorage(token: string) {
  localStorage.setItem(localKey, token)
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem(localKey)
}

export function removeTokenFromLocalStorage() {
  return localStorage.removeItem(localKey)
}
