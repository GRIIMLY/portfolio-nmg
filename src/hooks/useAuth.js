import { useState, useEffect } from 'react'
import { isAuthenticated, login as authLogin, logout as authLogout } from '../lib/auth'

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated())

  useEffect(() => {
    setAuthenticated(isAuthenticated())
  }, [])

  async function login(username, password) {
    const ok = await authLogin(username, password)
    if (ok) setAuthenticated(true)
    return ok
  }

  function logout() {
    authLogout()
    setAuthenticated(false)
  }

  return { authenticated, login, logout }
}
