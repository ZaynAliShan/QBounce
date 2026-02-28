import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { isAllowedRedirect } from '../components/ProtectedRoute'
import { SESSION_TOKEN_KEY } from '../lib/constants'

const SEND_OTP_URL = 'https://prod.api.qbouncepro.com/api/send-otp'
const CONFIRM_OTP_URL = 'https://prod.api.qbouncepro.com/api/confirm-otp'
const OTP_LENGTH = 6
const TOAST_DURATION_MS = 4000

const SignInPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect')
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const otpInputRefs = useRef([])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), TOAST_DURATION_MS)
    return () => clearTimeout(t)
  }, [toast])

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(SEND_OTP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      let data
      try {
        data = await res.json()
      } catch {
        throw new Error('Invalid response from server. Please try again.')
      }
      if (!res.ok || data.is_error) {
        throw new Error(data.message || 'Failed to send OTP')
      }
      setOtpSent(true)
      setOtp(Array(OTP_LENGTH).fill(''))
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(0, 1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    if (digit && index < OTP_LENGTH - 1) otpInputRefs.current[index + 1]?.focus()
  }

  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, OTP_LENGTH).split('')
    if (pasted.length === 0) return
    const next = [...pasted, ...Array(OTP_LENGTH).fill('')].slice(0, OTP_LENGTH)
    setOtp(next)
    const nextFocus = Math.min(pasted.length, OTP_LENGTH) - 1
    otpInputRefs.current[nextFocus]?.focus()
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length !== OTP_LENGTH) {
      setError('Please enter the full 6-digit code.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch(CONFIRM_OTP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: code }),
      })
      let data
      try {
        data = await res.json()
      } catch {
        throw new Error('Invalid response from server. Please try again.')
      }
      if (data.is_error) {
        setError('Invalid OTP. Please try again.')
        return
      }
      if (!res.ok) {
        setError(data.message || 'Something went wrong. Please try again.')
        return
      }
      if (data.data?.session_token) {
        localStorage.setItem(SESSION_TOKEN_KEY, data.data.session_token)
      }
      login()
      setToast('Signed in successfully!')
      setOtp(Array(OTP_LENGTH).fill(''))
      const targetPath = redirectTo ? decodeURIComponent(redirectTo) : null
      if (targetPath && isAllowedRedirect(targetPath)) {
        navigate(targetPath, { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {loading && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-label={otpSent ? 'Verifying OTP…' : 'Sending OTP…'}
        >
          <img src="/images/loader.gif" alt="" className="h-24 w-24 sm:h-28 sm:w-28 object-contain" aria-hidden />
          <p className="text-white font-medium">
            {otpSent ? 'Verifying…' : 'Sending…'}
          </p>
        </div>
      )}
      {toast && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-lg bg-green-600 text-white text-sm font-medium shadow-lg"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}
      <Header />

      <main className="flex-1 pt-16 sm:pt-20 pb-14 sm:pb-12 px-6 sm:px-6 lg:px-8 min-h-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[calc(100vh-10rem)] gap-8 md:gap-0">
            {/* Left: Headline + form — on mobile, form is the focus */}
            <section className="flex flex-col justify-center md:justify-center pt-8 sm:pt-0 md:p-10 lg:p-12 order-2 md:order-1 max-w-md md:max-w-none">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                Welcome{' '}
                <span className="text-primary-orange">Back</span>
              </h1>
              <p className="mt-4 sm:mt-4 text-sm sm:text-base text-zinc-400 max-w-md">
                {otpSent ? 'Check your inbox and enter the code below.' : "Enter your email to continue. We'll take it from there."}
              </p>

              <div className="mt-8 sm:mt-8 w-full rounded-2xl bg-gray-900/50 border border-gray-800 p-6 sm:p-8 md:hover:border-primary-orange/50 transition-colors duration-200">
                {!otpSent ? (
                  <form className="space-y-5" onSubmit={handleSendOtp}>
                    <div className="space-y-3">
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                        Enter Your Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-zinc-700 bg-black/50 px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/30 transition text-base"
                      />
                    </div>
                    {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-primary-orange text-white font-semibold py-3.5 text-base hover:bg-primary-orange/90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 focus:ring-offset-black transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </form>
                ) : (
                  <form className="space-y-5" onSubmit={handleOtpSubmit}>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Enter code
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Sent to <span className="text-white font-medium">{email}</span>
                    </p>
                    <div className="flex gap-2 sm:gap-3 justify-center">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => (otpInputRefs.current[i] = el)}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          onPaste={handleOtpPaste}
                          aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-zinc-700 bg-black/50 text-white text-center text-lg font-semibold outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/30 transition"
                        />
                      ))}
                    </div>
                    {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-primary-orange text-white font-semibold py-3.5 text-base hover:bg-primary-orange/90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 focus:ring-offset-black transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Verify
                    </button>
                  </form>
                )}
              </div>

              <p className="mt-8 sm:mt-6 text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
                QBounce analyzes your sports video in real time for form, timing, and control so you can train smarter.
              </p>
            </section>

            {/* Right: Image — hidden on mobile/small screens, full height on md+ */}
            <section className="hidden md:flex relative md:h-auto md:min-h-0 md:self-stretch md:p-6 lg:p-8 items-center justify-center order-1 md:order-2">
              <div className="relative w-full h-full rounded-2xl md:rounded-2xl border border-zinc-800 md:border-primary-orange/30 overflow-hidden bg-zinc-900">
                <img
                  src="/images/sign-in-page-img-4.jpg"
                  alt="Athletes with QBounce"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default SignInPage
