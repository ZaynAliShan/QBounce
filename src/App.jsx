import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DownloadModalProvider } from './contexts/DownloadModalContext'
import ToastListener from './components/ToastListener'
import { ProtectedRoute } from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import FAQPage from './pages/FAQPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import ContactPage from './pages/ContactPage'
import SignInPage from './pages/SignInPage'
import HowToUsePage from './pages/HowToUsePage'
import HowToCastPage from './pages/HowToCastPage'
import TrainPage from './pages/TrainPage'
import AppHomePage from './pages/AppHomePage'
import LeaderboardPage from './pages/LeaderboardPage'
import ProfilePage from './pages/ProfilePage'
import { useAuth } from './contexts/AuthContext'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const scrollToElement = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo(0, 0)
      }
      requestAnimationFrame(() => setTimeout(scrollToElement, 0))
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function RootRoute() {
  const { isLoggedIn } = useAuth()
  if (isLoggedIn) {
    return <Navigate to="/home" replace />
  }
  return <HomePage />
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DownloadModalProvider>
          <ScrollToTop />
          <ToastListener />
          <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/home" element={<ProtectedRoute><AppHomePage /></ProtectedRoute>} />
          <Route path="/train" element={<ProtectedRoute><Navigate to="/train/beginner/0" replace /></ProtectedRoute>} />
          <Route path="/train/:category/:videoId" element={<ProtectedRoute><TrainPage /></ProtectedRoute>} />
          <Route path="/how-to-use" element={<ProtectedRoute><HowToUsePage /></ProtectedRoute>} />
          <Route path="/how-to-cast" element={<ProtectedRoute><HowToCastPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </DownloadModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
