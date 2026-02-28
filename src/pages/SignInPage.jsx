import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { SESSION_TOKEN_KEY } from '../lib/constants'

const SEND_OTP_URL = 'https://prod.api.qbouncepro.com/api/send-otp'
const CONFIRM_OTP_URL = 'https://prod.api.qbouncepro.com/api/confirm-otp'
const OTP_LENGTH = 6
const TOAST_DURATION_MS = 4000

const SignInPage = () => {
  const { login } = useAuth()
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

      <main className="flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-8 min-h-0">
        {/* Main content area */}
        <div className="max-w-6xl mx-auto overflow-hidden bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)]">
            {/* Left: Headline + form */}
            <section className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                Welcome{' '}
                <span className="text-primary-orange">Back</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400 max-w-md">
                {otpSent ? 'Check your inbox and enter the code below.' : "Enter your email to continue. We'll take it from there."}
              </p>

              <div className="mt-6 sm:mt-8 w-full max-w-md rounded-xl bg-gray-900/50 border border-gray-800 p-6 sm:p-8 hover:border-primary-orange/50 transition-all duration-300">
                {!otpSent ? (
                  <form className="space-y-5" onSubmit={handleSendOtp}>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Enter your email
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-zinc-600 bg-zinc-900/80 px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/40 transition"
                      />
                    </div>
                    {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-primary-orange text-white font-semibold py-3.5 text-base hover:bg-primary-orange/90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 focus:ring-offset-zinc-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <form className="space-y-5" onSubmit={handleOtpSubmit}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      OTP
                    </h2>
                    <p className="text-sm text-white">
                      Enter The Code Sent On <span className="text-white font-medium">{email}</span>
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
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg border border-zinc-600 bg-zinc-900/80 text-white text-center text-lg font-semibold outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/40 transition"
                        />
                      ))}
                    </div>
                    {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-primary-orange text-white font-semibold py-3.5 text-base hover:bg-primary-orange/90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 focus:ring-offset-zinc-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>

              <p className="mt-6 text-sm text-zinc-500">
                QBounce analyzes your sports video in real time for form, timing, and control so you can train smarter.
              </p>
            </section>

            {/* Right: Image in rounded frame with orange border */}
            <section className="relative min-h-[260px] sm:min-h-[340px] md:min-h-0 md:self-stretch p-4 sm:p-6 md:p-6 lg:p-8 flex items-center justify-center">
              <div className="relative w-full h-full min-h-[260px] sm:min-h-[340px] md:min-h-0 rounded-2xl border-2 border-primary-orange/50 overflow-hidden bg-zinc-900 shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[125%] min-w-[125%] h-[125%] min-h-[125%]">
                    <img
                      src="/images/sign-in-page-img-4.jpg"
                      alt="Athletes with QBounce"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
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
