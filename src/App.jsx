import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <ToastListener />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/how-to-use" element={<ProtectedRoute><HowToUsePage /></ProtectedRoute>} />
          <Route path="/how-to-cast" element={<ProtectedRoute><HowToCastPage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
