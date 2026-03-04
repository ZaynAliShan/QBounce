import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../../lib/api'
import { getCountryCode } from '../../lib/countries'

export default function UserCard({ onUserLoaded }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchUser() {
      try {
        const res = await get('/user-details')
        if (!cancelled && res?.data) {
          setUser(res.data)
          const categoryName = res.data.category_name
          if (categoryName) onUserLoaded?.(categoryName)
        }
      } catch {
        // keep null
      }
    }
    fetchUser()
    return () => { cancelled = true }
  }, [onUserLoaded])

  if (!user) {
    return (
      <div className="rounded-2xl border-2 border-gray-800 bg-gray-900/70 p-8 overflow-hidden flex flex-col items-center justify-center gap-4 text-center">
        <img
          src="/images/loader.gif"
          alt=""
          className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
          aria-hidden
        />
        <p className="text-gray-400 text-sm">Loading your profile…</p>
      </div>
    )
  }

  const flagCode = getCountryCode(user.country)
  const avatarUrl = user.image || `https://ui-avatars.com/api?name=${encodeURIComponent((user.first_name || '') + ' ' + (user.last_name || ''))}`
  const fallbackAvatar = 'https://ui-avatars.com/api?name=' + encodeURIComponent((user.first_name || '') + ' ' + (user.last_name || ''))

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gray-900/90 border-2 border-gray-700/80 shadow-2xl shadow-black/30">
      {/* Inner gradient glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.06) 40%, transparent 70%), linear-gradient(to bottom, rgba(249,115,22,0.06) 0%, transparent 35%)',
        }}
      />
      <div className="relative pt-6 pb-6 px-6 flex flex-col items-center text-center">
        {/* Avatar with card-style frame: inner cutout + gradient ring (like old lb-leaders-img) */}
        <div className="relative mb-3">
          <div className="p-2 rounded-full bg-gradient-to-br from-primary-orange via-primary-orange/90 to-amber-600 shadow-xl shadow-primary-orange/25 ring-4 ring-gray-900">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-gray-900 bg-gray-800">
              <img
                src={avatarUrl}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = fallbackAvatar }}
              />
            </div>
          </div>
          {/* Flag badge (like old card flag position) */}
          {flagCode && (
            <span className="absolute -bottom-0.5 -right-0.5 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-gray-900 shadow-lg overflow-hidden bg-gray-800 ring-2 ring-primary-orange/50">
              <img
                src={`https://flagcdn.com/w80/${flagCode}.png`}
                alt=""
                className="w-full h-full object-cover"
              />
            </span>
          )}
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white truncate max-w-full px-2">
          {user.first_name} {user.last_name}
        </h2>
        {user.country && (
          <p className="text-sm text-gray-400 truncate max-w-full mt-0.5">{user.country}</p>
        )}

        {/* XP badge: card-footer style (like old card bottom with total_xp) */}
        <div className="mt-4 w-full max-w-[200px] rounded-xl bg-gray-800/80 border border-gray-700 flex items-center justify-between px-4 py-2.5">
          <span className="text-gray-400 text-sm font-medium">Total XP</span>
          <span className="text-primary-orange font-bold text-lg tabular-nums">{user.total_xp ?? 0}</span>
        </div>

        <Link
          to="/profile"
          className="mt-4 text-sm font-medium text-primary-orange hover:text-primary-orange/90 hover:underline transition-colors"
        >
          View profile
        </Link>
      </div>
    </div>
  )
}
