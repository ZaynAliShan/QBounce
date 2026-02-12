import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const logo = '/images/logos/logo-cropped.png'

const Header = ({ onGetStartedClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleGetStarted = (e) => {
    e.preventDefault()
    onGetStartedClick?.()
    setIsMenuOpen(false)
  }

  const navItems = [
    { label: 'Features', to: '/#features' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'Sports', to: '/#sports' },
    { label: 'Pricing', to: '/#pricing' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-primary-orange/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="QBounce Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-white hover:text-primary-orange transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              {onGetStartedClick ? (
                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="bg-primary-orange text-black px-6 py-2 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors duration-200"
                >
                  Get Started
                </button>
              ) : (
                <Link
                  to="/"
                  className="bg-primary-orange text-black px-6 py-2 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors duration-200 inline-block"
                >
                  Get Started
                </Link>
              )}
              <a
                href="https://qbouncepro.com/sign_in"
                className="border border-primary-orange text-primary-orange px-6 py-2 rounded-lg font-semibold hover:bg-primary-orange/10 transition-colors duration-200"
              >
                Sign In
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-primary-orange transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block text-white hover:text-primary-orange transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2">
              {onGetStartedClick ? (
                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="block w-full bg-primary-orange text-black px-6 py-2 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors duration-200 text-center"
                >
                  Get Started
                </button>
              ) : (
                <Link
                  to="/"
                  className="block w-full bg-primary-orange text-black px-6 py-2 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
              <a
                href="https://qbouncepro.com/sign_in"
                className="block w-full border border-primary-orange text-primary-orange px-6 py-2 rounded-lg font-semibold hover:bg-primary-orange/10 transition-colors duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
