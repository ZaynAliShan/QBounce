import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { SESSION_TOKEN_KEY, SIGNOUT_URL } from '../lib/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem(SESSION_TOKEN_KEY))

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(async () => {
    const token = localStorage.getItem(SESSION_TOKEN_KEY)
    let message = 'You have signed out successfully.'
    try {
      const res = await fetch(SIGNOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'X-Session-Token': token }),
        },
      })
      try {
        const data = await res.json()
        if (data.message) message = data.message
      } catch {
        // use default message
      }
    } finally {
      localStorage.removeItem(SESSION_TOKEN_KEY)
      setIsLoggedIn(false)
      window.dispatchEvent(new CustomEvent('qbounce-toast', { detail: { message } }))
    }
  }, [])

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === SESSION_TOKEN_KEY) setIsLoggedIn(!!localStorage.getItem(SESSION_TOKEN_KEY))
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
