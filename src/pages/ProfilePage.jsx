import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { get, post } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'
import { COUNTRY_NAMES } from '../lib/countries'

const POSITIONS = [
  'Point Guard',
  'Shooting Guard',
  'Small Forward',
  'Power Forward',
  'Center',
]

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

const TEAMS = [
  { name: 'Hawks', value: 'hawks' },
  { name: 'Celtics', value: 'celtics' },
  { name: 'Nets', value: 'nets' },
  { name: 'Hornets', value: 'hornets' },
  { name: 'Bulls', value: 'bulls' },
  { name: 'Cavaliers', value: 'cavaliers' },
  { name: 'Mavericks', value: 'mavericks' },
  { name: 'Nuggets', value: 'nuggets' },
  { name: 'Pistons', value: 'pistons' },
  { name: 'Warriors', value: 'warriors' },
  { name: 'Rockets', value: 'rockets' },
  { name: 'Pacers', value: 'pacers' },
  { name: 'Clippers', value: 'clippers' },
  { name: 'Lakers', value: 'lakers' },
  { name: 'Grizzlies', value: 'grizzlies' },
  { name: 'Heat', value: 'heat' },
  { name: 'Bucks', value: 'bucks' },
  { name: 'Timberwolves', value: 'timberwolves' },
  { name: 'Pelicans', value: 'pelicans' },
  { name: 'Knicks', value: 'knicks' },
  { name: 'Thunder', value: 'thunder' },
  { name: 'Magic', value: 'magic' },
  { name: '76ers', value: '76ers' },
  { name: 'Suns', value: 'suns' },
  { name: 'Blazers', value: 'blazers' },
  { name: 'Kings', value: 'kings' },
  { name: 'Spurs', value: 'spurs' },
  { name: 'Raptors', value: 'raptors' },
  { name: 'Jazz', value: 'jazz' },
  { name: 'Wizards', value: 'wizards' },
]

const inputClass =
  'w-full rounded-2xl border border-gray-800 bg-gray-900/80 px-3.5 py-2.5 text-white placeholder:text-gray-500 outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/40 hover:border-gray-600 transition text-sm sm:text-[15px] shadow-sm'
const labelClass = 'block text-sm font-medium text-gray-300 mb-2'

export default function ProfilePage() {
  const fileInputRef = useRef(null)
  const { logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    jersey_number: '',
    position: '',
    gender: '',
    future_team: '',
    instagram: '',
  })

  useEffect(() => {
    let cancelled = false
    async function fetchProfile() {
      setLoading(true)
      setError('')
      try {
        const res = await get('/user_info')
        if (cancelled) return
        if (res?.data) {
          const data = res.data
          setProfile(data)
          setForm((prev) => ({
            ...prev,
            first_name: data.first_name ?? '',
            last_name: data.last_name ?? '',
            email: data.email ?? '',
            country: data.country ?? '',
            jersey_number: data.jersey_number != null ? String(data.jersey_number) : '',
            position: data.position ?? '',
            gender: data.gender ?? '',
            future_team: data.team ?? data.future_team ?? '',
            instagram: data.instagram ?? '',
          }))
        } else {
          setError(res?.message || 'Unable to load profile. Please try again.')
        }
      } catch {
        if (!cancelled) setError('Unable to load profile. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchProfile()
    return () => {
      cancelled = true
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageClick = () => fileInputRef.current?.click()

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const trimmedFirst = form.first_name.trim()
    const trimmedLast = form.last_name.trim()
    if (!trimmedFirst || !trimmedLast) {
      setError('Please enter both first and last name.')
      return
    }

    const basePayload = {
      first_name: trimmedFirst,
      last_name: trimmedLast,
      country: form.country.trim() || null,
      jersey_number: form.jersey_number.trim() || null,
      position: form.position.trim() || null,
      gender: form.gender || null,
      team: form.future_team.trim() || null,
      instagram: form.instagram.trim() || null,
    }

    setSaving(true)
    try {
      if (imageFile) {
        const formData = new FormData()
        Object.entries(basePayload).forEach(([key, value]) => {
          if (value != null && String(value).trim() !== '') {
            formData.append(key, value)
          }
        })
        formData.append('image', imageFile)
        const res = await post('/user_info', formData)
        if (res?.is_error) {
          const imageErr =
            res?.errors?.image && Array.isArray(res.errors.image)
              ? res.errors.image[0]
              : null
          setError(imageErr || res.message || 'Unable to save profile. Please try again.')
          return
        }
        const nextProfile = res?.data || { ...(profile || {}), ...basePayload }
        setProfile(nextProfile)
        setImageFile(null)
        setImagePreview(null)
      } else {
        const res = await post('/user_info', basePayload)
        if (res?.is_error) {
          setError(res.message || 'Unable to save profile. Please try again.')
          return
        }
        const nextProfile = res?.data || { ...(profile || {}), ...basePayload }
        setProfile(nextProfile)
      }
      window.dispatchEvent(
        new CustomEvent('qbounce-toast', {
          detail: { message: 'Profile updated successfully.' },
        })
      )
    } catch {
      setError('Unable to save profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    setLoggingOut(true)
    try {
      await logout()
      setLogoutConfirmOpen(false)
    } finally {
      setLoggingOut(false)
    }
  }

  const avatarUrl =
    imagePreview ||
    (profile &&
      (profile.image ||
        `https://ui-avatars.com/api?name=${encodeURIComponent(
          `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
        )}`)) ||
    ''

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-6 sm:pt-8">
          <Link
            to="/home"
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary-orange transition-colors mb-1 sm:mb-2"
          >
            ← Back to Home
          </Link>
          {/* Title row: EDIT YOUR PROFILE + Upload area */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pt-3 sm:pt-4 pb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
                Edit your profile
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Update your player details to personalize your QBounce experience.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-6 sm:p-8 animate-pulse">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="h-40 w-40 rounded-xl bg-gray-800 border-2 border-primary-orange/30 flex-shrink-0" />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-12 bg-gray-800 rounded-xl" />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <div className="h-11 w-28 bg-gray-800 rounded-xl" />
                <div className="h-11 w-24 bg-primary-orange/50 rounded-xl" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Upload + form grid */}
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Upload image - large, sleek avatar */}
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border border-gray-800 bg-gray-900/80 overflow-hidden shadow-md hover:shadow-lg hover:border-primary-orange/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Upload profile image"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                      aria-hidden
                    />
                    <div className="relative w-full h-full">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <svg
                            className="w-7 h-7 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-2 flex justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-black/80 px-3 py-1 shadow-md">
                          <span className="text-xs sm:text-[13px] font-semibold text-white">
                            Upload Image
                          </span>
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Two-column form */}
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                  {/* Left column */}
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="gender" className={labelClass}>
                        Your gender
                      </label>
                      <div className="relative">
                        <select
                          id="gender"
                          name="gender"
                          value={form.gender || ''}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          <option value="">Select gender</option>
                          {GENDERS.map((g) => (
                            <option key={g.value} value={g.value}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 8L10 13L15 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="position" className={labelClass}>
                        Your position
                      </label>
                      <div className="relative">
                        <select
                          id="position"
                          name="position"
                          value={form.position || ''}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          <option value="">Select position</option>
                          {POSITIONS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 8L10 13L15 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="country" className={labelClass}>
                        Your country name
                      </label>
                      <div className="relative">
                        <select
                          id="country"
                          name="country"
                          value={form.country || ''}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          <option value="">Select country</option>
                          {COUNTRY_NAMES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 8L10 13L15 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="instagram" className={labelClass}>
                        Your Instagram
                      </label>
                      <input
                        id="instagram"
                        name="instagram"
                        type="text"
                        value={form.instagram}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your Instagram"
                      />
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="first_name" className={labelClass}>
                        Your first name
                      </label>
                      <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        autoComplete="given-name"
                        value={form.first_name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your First Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name" className={labelClass}>
                        Your last name
                      </label>
                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        autoComplete="family-name"
                        value={form.last_name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your Last Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="future_team" className={labelClass}>
                        Your future team
                      </label>
                      <div className="relative">
                        <select
                          id="future_team"
                          name="future_team"
                          value={form.future_team || ''}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          <option value="">Your Future Team</option>
                          {TEAMS.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 8L10 13L15 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="jersey_number" className={labelClass}>
                        Your jersey number
                      </label>
                      <input
                        id="jersey_number"
                        name="jersey_number"
                        type="text"
                        inputMode="numeric"
                        value={form.jersey_number}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your Jersey Number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {form.email && (
                <div className="max-w-md">
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    readOnly
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/60 px-4 py-3 text-gray-400 text-sm cursor-not-allowed"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-800 mt-2">
                <div className="flex items-center gap-3 order-2 sm:order-1">
                  <button
                    type="button"
                    onClick={() => setLogoutConfirmOpen(true)}
                    className="min-w-[120px] rounded-xl border border-gray-600 bg-gray-800/80 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700/80 transition-colors text-center"
                  >
                    Sign out
                  </button>
                </div>
                <div className="order-1 sm:order-2">
                  {error && (
                    <p className="text-sm text-red-400 mb-2" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={saving}
                    className="min-w-[120px] rounded-xl bg-primary-orange text-black font-semibold px-5 py-2.5 text-sm hover:bg-primary-orange/90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 focus:ring-offset-black transition disabled:opacity-60 disabled:cursor-not-allowed text-center"
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />

      {/* Sign out confirmation modal */}
      {logoutConfirmOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-logout-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setLogoutConfirmOpen(false)}
            aria-label="Close"
          />
          <div className="relative max-w-sm w-full bg-black border-2 border-primary-orange/50 rounded-2xl shadow-2xl shadow-primary-orange/20 p-6">
            <h2 id="profile-logout-title" className="text-lg font-bold text-white mb-2">
              Sign out?
            </h2>
            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to sign out of your QBounce account?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setLogoutConfirmOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-600 text-gray-200 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={loggingOut}
                className="px-4 py-2 rounded-xl bg-primary-orange text-black text-sm font-semibold hover:bg-primary-orange/90 transition-colors disabled:opacity-60"
              >
                {loggingOut ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
