const ADMIN_USER = import.meta.env.VITE_ADMIN_USER
const ADMIN_HASH = import.meta.env.VITE_ADMIN_HASH
const SESSION_KEY = 'portfolio_admin'

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function login(username, password) {
  const hash = await sha256(password)
  if (username === ADMIN_USER && hash === ADMIN_HASH) {
    sessionStorage.setItem(SESSION_KEY, 'true')
    return true
  }
  return false
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === 'true'
}
