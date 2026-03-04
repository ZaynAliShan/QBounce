import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useDownloadModal } from '../contexts/DownloadModalContext'

const logo = '/images/logos/logo.png'

const howToDropdownItems = [
  { label: 'How To Cast', to: '/how-to-cast' },
  { label: 'How To Use', to: '/how-to-use' },
  { label: 'How It Works', to: '/#how-it-works' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [howToOpen, setHowToOpen] = useState(false)
  const [mobileHowToOpen, setMobileHowToOpen] = useState(false)
  const howToRef = React.useRef(null)
  const { pathname, hash } = useLocation()
  const { isLoggedIn } = useAuth()
  const { openDownloadModal } = useDownloadModal()

  const visibleHowToItems = isLoggedIn
    ? howToDropdownItems.filter((item) => item.label !== 'How It Works')
    : howToDropdownItems

  const isHowToChildActive = (to) => {
    if (to === '/#how-it-works') return pathname === '/' && hash === '#how-it-works'
    return pathname === to
  }
  const isAnyHowToActive = isLoggedIn && visibleHowToItems.some((item) => isHowToChildActive(item.to))

  const isNavItemActive = (item) => {
    if (!isLoggedIn || !item.to) return false
    if (item.to === '/home') return pathname === '/home'
    if (item.to === '/train') return pathname.startsWith('/train')
    if (item.to === '/leaderboard') return pathname === '/leaderboard'
    return false
  }

  const handleGetStarted = (e) => {
    e?.preventDefault()
    openDownloadModal()
    setIsMenuOpen(false)
  }

  // Lock body scroll when drawer is open; close drawer on Escape
  useEffect(() => {
    if (!isMenuOpen) {
      setMobileHowToOpen(false)
      return
    }
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

  // Close desktop "How To" dropdown when clicking outside
  useEffect(() => {
    if (!howToOpen) return
    const handleClickOutside = (e) => {
      if (howToRef.current && !howToRef.current.contains(e.target)) setHowToOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [howToOpen])

  const navItems = isLoggedIn
    ? [
        { label: 'Home', to: '/home' },
        { label: 'Train', to: '/train' },
        { label: 'Leaderboard', to: '/leaderboard' },
        { label: 'How To', dropdown: visibleHowToItems },
        { label: 'Shop Link', href: 'https://qbouncesport.com/?trafficSource=qbouncepro.com', external: true },
      ]
    : [
        { label: 'Features', to: '/#features' },
        { label: 'How It Works', to: '/#how-it-works' },
        { label: 'Sports', to: '/#sports' },
        { label: 'Pricing', to: '/#pricing' },
        { label: 'Shop Link', href: 'https://qbouncesport.com/?trafficSource=qbouncepro.com', external: true },
      ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-primary-orange/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 min-w-0">
          {/* Logo - shrinks on small screens to leave room */}
          <div className="flex-shrink-0 min-w-0">
            <Link to={isLoggedIn ? '/home' : '/'} className="flex items-center" aria-label="QBounce home">
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
              if (item.dropdown) {
                const linkClass =
                  'font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap ' +
                  (isAnyHowToActive ? 'text-primary-orange border-b-2 border-primary-orange pb-0.5' : 'text-white hover:text-primary-orange')
                return (
                  <div key={item.label} className="relative" ref={howToRef}>
                    <button
                      type="button"
                      onClick={() => setHowToOpen((o) => !o)}
                      className={linkClass}
                      aria-expanded={howToOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg className="inline-block w-4 h-4 ml-0.5 align-middle opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: howToOpen ? 'rotate(180deg)' : 'none' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {howToOpen && (
                      <div className="absolute top-full left-0 mt-1 py-1 min-w-[180px] bg-black/95 border border-primary-orange/20 rounded-lg shadow-xl z-50">
                        {item.dropdown.map((sub) => {
                          const subActive = isLoggedIn && isHowToChildActive(sub.to)
                          return (
                            <Link
                              key={sub.label}
                              to={sub.to}
                              className={`block px-4 py-2 text-sm font-medium transition-colors ${subActive ? 'text-primary-orange bg-primary-orange/10' : 'text-white hover:text-primary-orange hover:bg-white/5'}`}
                              onClick={() => setHowToOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }
              const active = isNavItemActive(item)
              const linkClass =
                'font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap ' +
                (active ? 'text-primary-orange border-b-2 border-primary-orange pb-0.5' : 'text-white hover:text-primary-orange')
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
              <button
                type="button"
                onClick={handleGetStarted}
                className="bg-primary-orange text-black px-4 py-1.5 xl:px-6 xl:py-2 rounded-lg font-semibold text-sm xl:text-base hover:bg-primary-orange/90 transition-colors duration-200 whitespace-nowrap inline-flex items-center gap-2"
              >
                {isLoggedIn ? 'Get the app' : 'Get Started'}
                {isLoggedIn && (
                  <img
                    src="https://img.icons8.com/ios/100/iphone14-pro.png"
                    alt=""
                    className="w-5 h-5 xl:w-6 xl:h-6 object-contain"
                    width={24}
                    height={24}
                  />
                )}
              </button>
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="border border-primary-orange text-primary-orange px-4 py-1.5 xl:px-6 xl:py-2 rounded-lg font-semibold text-sm xl:text-base hover:bg-primary-orange/10 transition-colors duration-200 whitespace-nowrap inline-flex items-center gap-2"
                >
                  <span className="leading-none inline-block">Profile</span>
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2.75C7.44365 2.75 3.75 6.44365 3.75 11C3.75 15.5563 7.44365 19.25 12 19.25C16.5563 19.25 20.25 15.5563 20.25 11C20.25 6.44365 16.5563 2.75 12 2.75Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12.25C13.7949 12.25 15.25 10.7949 15.25 9C15.25 7.20507 13.7949 5.75 12 5.75C10.2051 5.75 8.75 7.20507 8.75 9C8.75 10.7949 10.2051 12.25 12 12.25Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.75 17.75C8.48635 16.4073 10.0552 15.5 12 15.5C13.9448 15.5 15.5136 16.4073 16.25 17.75"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
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
                    if (item.dropdown) {
                      const mobileHowToActive = isAnyHowToActive
                      return (
                        <div key={item.label}>
                          <button
                            type="button"
                            onClick={() => setMobileHowToOpen((o) => !o)}
                            className={`block w-full text-left py-3 px-2 -mx-2 font-medium transition-colors duration-200 text-base rounded-lg flex items-center justify-between ${mobileHowToActive ? 'text-primary-orange bg-primary-orange/10' : 'text-white hover:text-primary-orange hover:bg-white/5'}`}
                            aria-expanded={mobileHowToOpen}
                          >
                            {item.label}
                            <svg className="w-5 h-5 flex-shrink-0" style={{ transform: mobileHowToOpen ? 'rotate(180deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {mobileHowToOpen && (
                            <div className="pl-3 mt-1 space-y-0.5 border-l-2 border-gray-700 ml-2">
                              {item.dropdown.map((sub) => {
                                const subActive = isLoggedIn && isHowToChildActive(sub.to)
                                return (
                                  <Link
                                    key={sub.label}
                                    to={sub.to}
                                    className={`block py-2.5 px-2 -mx-2 text-sm font-medium rounded-lg transition-colors ${subActive ? 'text-primary-orange bg-primary-orange/10' : 'text-white hover:text-primary-orange hover:bg-white/5'}`}
                                    onClick={() => {
                                      setMobileHowToOpen(false)
                                      setIsMenuOpen(false)
                                    }}
                                  >
                                    {sub.label}
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    }
                    const mobileActive = isNavItemActive(item)
                    const linkClass =
                      'block py-3 px-2 -mx-2 font-medium transition-colors duration-200 text-base rounded-lg ' +
                      (mobileActive ? 'text-primary-orange bg-primary-orange/10' : 'text-white hover:text-primary-orange hover:bg-white/5')
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
                  <button
                    type="button"
                    onClick={handleGetStarted}
                    className="w-full bg-primary-orange text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors duration-200 text-center inline-flex items-center justify-center gap-2"
                  >
                    {isLoggedIn ? 'Get the app' : 'Get Started'}
                    {isLoggedIn && (
                      <img
                        src="https://img.icons8.com/ios/100/iphone14-pro.png"
                        alt=""
                        className="w-6 h-6 object-contain"
                        width={24}
                        height={24}
                      />
                    )}
                  </button>
                  {isLoggedIn ? (
                    <Link
                      to="/profile"
                      className="w-full bg-gray-100/5 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100/10 transition-colors duration-200 text-center block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="inline-flex items-center justify-center gap-2 align-middle">
                        <span className="leading-none inline-block">Profile</span>
                        <svg
                          className="w-6 h-6 text-primary-orange"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2.75C7.44365 2.75 3.75 6.44365 3.75 11C3.75 15.5563 7.44365 19.25 12 19.25C16.5563 19.25 20.25 15.5563 20.25 11C20.25 6.44365 16.5563 2.75 12 2.75Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 12.25C13.7949 12.25 15.25 10.7949 15.25 9C15.25 7.20507 13.7949 5.75 12 5.75C10.2051 5.75 8.75 7.20507 8.75 9C8.75 10.7949 10.2051 12.25 12 12.25Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.75 17.75C8.48635 16.4073 10.0552 15.5 12 15.5C13.9448 15.5 15.5136 16.4073 16.25 17.75"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
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
