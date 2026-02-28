import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const logo = '/images/logos/logo-cropped.png'

const Header = ({ onGetStartedClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { isLoggedIn, logout } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async (e) => {
    e.preventDefault()
    setLoggingOut(true)
    try {
      await logout()
      setIsMenuOpen(false)
    } finally {
      setLoggingOut(false)
    }
  }

  const handleGetStarted = (e) => {
    e.preventDefault()
    onGetStartedClick?.()
    setIsMenuOpen(false)
  }

  // Lock body scroll when drawer is open; close drawer on Escape
  useEffect(() => {
    if (!isMenuOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const navItems = [
    { label: 'Features', to: '/#features' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'Sports', to: '/#sports' },
    { label: 'Pricing', to: '/#pricing' },
    { label: 'How To Use', to: '/how-to-use' },
    { label: 'How To Cast', to: '/how-to-cast' },
    { label: 'Shop Link', href: 'https://qbouncesport.com/?trafficSource=qbouncepro.com', external: true },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-primary-orange/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 min-w-0">
          {/* Logo - shrinks on small screens to leave room */}
          <div className="flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center" aria-label="QBounce home">
              <img
                src={logo}
                alt="QBounce Logo"
                className="h-9 sm:h-10 lg:h-12 w-auto max-h-12"
              />
            </Link>
          </div>

          {/* Desktop Navigation - visible from lg so all links fit without cramping */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6 flex-shrink min-w-0">
            {navItems.map((item) => {
              const isActive = item.to && pathname === item.to && (item.to === '/how-to-use' || item.to === '/how-to-cast')
              const linkClass = `font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap ${
                isActive ? 'text-primary-orange border-b-2 border-primary-orange pb-0.5' : 'text-white hover:text-primary-orange'
              }`
              if (item.external && item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {item.label}
                  </a>
                )
              }
              return (
                <Link key={item.label} to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              )
            })}
            <div className="flex items-center gap-2 xl:gap-3 flex-shrink-0 ml-1">
              {onGetStartedClick ? (
                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="bg-primary-orange text-black px-4 py-1.5 xl:px-6 xl:py-2 rounded-lg font-semibold text-sm xl:text-base hover:bg-primary-orange/90 transition-colors duration-200 whitespace-nowrap"
                >
                  Get Started
                </button>
              ) : (
                <Link
                  to="/"
                  className="bg-primary-orange text-black px-4 py-1.5 xl:px-6 xl:py-2 rounded-lg font-semibold text-sm xl:text-base hover:bg-primary-orange/90 transition-colors duration-200 inline-block whitespace-nowrap"
                >
                  Get Started
                </Link>
              )}
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="border border-primary-orange text-primary-orange px-4 py-1.5 xl:px-6 xl:py-2 rounded-lg font-semibold text-sm xl:text-base hover:bg-primary-orange/10 transition-colors duration-200 disabled:opacity-60 whitespace-nowrap"
                >
                  {loggingOut ? 'Logging out…' : 'Log out'}
                </button>
              ) : (
                <Link
                  to="/sign-in"
                  className="border border-primary-orange text-primary-orange px-4 py-1.5 xl:px-6 xl:py-2 rounded-lg font-semibold text-sm xl:text-base hover:bg-primary-orange/10 transition-colors duration-200 whitespace-nowrap"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Menu Button - shown below lg */}
          <button
            className="lg:hidden flex-shrink-0 p-2 -m-2 text-white hover:text-primary-orange transition-colors rounded-lg hover:bg-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </nav>

      {/* Mobile/Tablet Drawer - rendered in portal so it's never clipped */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] lg:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            aria-hidden={!isMenuOpen}
          >
            {/* Backdrop */}
            <button
              type="button"
              className="absolute inset-0 z-0 bg-black/70 transition-opacity duration-300 ease-out focus:outline-none"
              style={{ opacity: isMenuOpen ? 1 : 0 }}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            />
            {/* Drawer panel */}
            <div
              className="fixed top-0 right-0 bottom-0 h-full w-[85vw] max-w-xs bg-black border-l border-gray-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out z-10"
              style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
            >
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-800 flex-shrink-0">
                <span className="text-white font-semibold">Menu</span>
                <button
                  type="button"
                  className="p-2 -m-2 text-white hover:text-primary-orange transition-colors rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto py-4 px-4 sm:px-6">
                <nav className="space-y-1" aria-label="Main">
                  {navItems.map((item) => {
                    const isActive = item.to && pathname === item.to && (item.to === '/how-to-use' || item.to === '/how-to-cast')
                    const linkClass = `block py-3 px-2 -mx-2 font-medium transition-colors duration-200 text-base rounded-lg ${isActive ? 'text-primary-orange bg-primary-orange/10' : 'text-white hover:text-primary-orange hover:bg-white/5'}`
                    if (item.external && item.href) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      )
                    }
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        className={linkClass}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
                <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col gap-2">
                  {onGetStartedClick ? (
                    <button
                      type="button"
                      onClick={handleGetStarted}
                      className="w-full bg-primary-orange text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors duration-200 text-center"
                    >
                      Get Started
                    </button>
                  ) : (
                    <Link
                      to="/"
                      className="w-full bg-primary-orange text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors duration-200 text-center block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  )}
                  {isLoggedIn ? (
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full border border-primary-orange text-primary-orange px-6 py-3 rounded-lg font-semibold hover:bg-primary-orange/10 transition-colors duration-200 text-center disabled:opacity-60"
                    >
                      {loggingOut ? 'Logging out…' : 'Log out'}
                    </button>
                  ) : (
                    <Link
                      to="/sign-in"
                      className="w-full border border-primary-orange text-primary-orange px-6 py-3 rounded-lg font-semibold hover:bg-primary-orange/10 transition-colors duration-200 text-center block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
          'drawer-menu'
        )}
    </header>
  )
}

export default Header
