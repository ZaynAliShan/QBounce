import React, { useEffect, useState } from 'react'
import { get } from '../../lib/api'

function StarIcon({ filled }) {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

export default function UserDetailsBar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchUser() {
      try {
        const res = await get('/profile')
        if (!cancelled && res?.data) setUser(res.data)
      } catch {
        // keep null
      }
    }
    fetchUser()
    return () => { cancelled = true }
  }, [])

  if (!user) {
    return (
      <div className="rounded-xl sm:rounded-2xl border border-gray-700 bg-gray-900/95 p-3 sm:p-5 mb-4 sm:mb-6 animate-pulse overflow-hidden ring-1 ring-white/5">
        <div className="h-9 sm:h-10 rounded-t-lg bg-gray-700 mb-3 sm:mb-5" />
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg bg-gray-800 flex-shrink-0" />
          <div className="flex-1 h-5 sm:h-6 bg-gray-800 rounded-lg max-w-[140px] sm:max-w-[180px]" />
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'PTS', full: 'Points', value: user.average_points_scored ?? 0 },
    { label: 'REB', full: 'Rebounds', value: user.average_rebounds ?? 0 },
    { label: 'AST', full: 'Assists', value: user.average_assists ?? 0 },
    { label: 'STL', full: 'Steals', value: user.average_steals ?? 0 },
    { label: 'BLK', full: 'Blocks', value: user.average_blocked_shots ?? 0 },
  ]
  const stars = Math.min(5, Math.max(0, Number(user.stars) || 0))
  const avatarUrl = user.image || `https://ui-avatars.com/api?name=${encodeURIComponent((user.first_name || '') + ' ' + (user.last_name || ''))}`

  return (
    <div className="rounded-xl sm:rounded-2xl border border-gray-700 bg-gray-900/95 overflow-hidden mb-4 sm:mb-6 shadow-xl shadow-black/30 ring-1 ring-white/5">
      {/* Card header */}
      <div className="flex items-center justify-between px-3 py-2.5 sm:px-5 sm:py-3 bg-primary-orange text-black">
        <span className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest">My Player</span>
        {user.jersey_number != null && user.jersey_number !== '' && (
          <span className="font-bold text-base sm:text-lg tabular-nums">#{user.jersey_number}</span>
        )}
      </div>

      <div className="p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5 md:gap-6 bg-gray-900/80">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-orange to-primary-orange/80 shadow-lg ring-2 ring-primary-orange/30">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-gray-900 bg-gray-800">
                <img
                  src={avatarUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://ui-avatars.com/api?name=' + encodeURIComponent((user.first_name || '') + ' ' + (user.last_name || '')) }}
                />
              </div>
            </div>
            {user.jersey_number != null && user.jersey_number !== '' && (
              <span className="absolute -bottom-0.5 -right-0.5 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md sm:rounded-lg bg-primary-orange text-black font-bold text-xs sm:text-sm md:text-base flex items-center justify-center border-2 border-gray-900 shadow-lg">
                {user.jersey_number}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-bold text-base sm:text-lg md:text-xl truncate">
              {user.first_name} {user.last_name}
            </p>
            <div className="flex items-center gap-0.5 sm:gap-1 text-amber-400 mt-1 sm:mt-1.5" aria-label={`${stars} stars`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={i <= stars} />
              ))}
            </div>
          </div>
        </div>

        {/* Stat cards — 5 narrow columns on mobile, flex on larger screens */}
        <div className="grid grid-cols-5 sm:flex sm:flex-wrap sm:justify-end gap-1.5 sm:gap-3 w-full sm:w-auto">
          {stats.map(({ label, full, value }) => (
            <div
              key={label}
              title={full}
              className="flex flex-col min-w-0 rounded-md sm:rounded-xl overflow-hidden bg-gray-800 border border-gray-600/80 shadow-lg shadow-black/20 hover:border-gray-500/80 transition-colors sm:min-w-[72px] md:min-w-[80px]"
            >
              <div className="w-full py-1 sm:py-2 bg-primary-orange flex items-center justify-center">
                <span className="text-black font-bold text-[10px] sm:text-sm tracking-wide">{label}</span>
              </div>
              <div className="py-1.5 sm:py-3 px-0.5 sm:px-2 flex items-center justify-center bg-gray-800/90 min-h-[36px] sm:min-h-0">
                <span className="text-white font-bold text-sm sm:text-2xl md:text-3xl tabular-nums leading-none">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
