import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ALLOWED_REDIRECT_PATHS = ['/how-to-use', '/how-to-cast', '/contact']

export function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    const redirect = encodeURIComponent(location.pathname + (location.search || '') + (location.hash || ''))
    return <Navigate to={`/sign-in?redirect=${redirect}`} replace state={{ from: location }} />
  }

  return children
}

export function isAllowedRedirect(path) {
  if (!path || typeof path !== 'string') return false
  const normalized = path.startsWith('/') ? path : `/${path}`
  return ALLOWED_REDIRECT_PATHS.some((allowed) => normalized === allowed || normalized.startsWith(allowed + '/'))
}
