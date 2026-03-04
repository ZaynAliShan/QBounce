import React from 'react'
import { getCountryCode } from '../../lib/countries'

const RANK_STYLES = [
  { label: '2nd', medal: '🥈', ring: 'from-gray-400 to-gray-500', border: 'border-gray-400/60', bg: 'bg-gray-800/90', badge: 'bg-gray-500/90 text-white', header: 'from-gray-600/40 to-transparent' },
  { label: '1st', medal: '🥇', crown: '👑', ring: 'from-amber-400 via-yellow-400 to-amber-500', border: 'border-amber-400/70', bg: 'bg-gray-800/90', badge: 'bg-amber-500 text-black', header: 'from-amber-500/30 to-transparent', elevate: true },
  { label: '3rd', medal: '🥉', ring: 'from-amber-700 via-amber-800 to-amber-900', border: 'border-amber-700/60', bg: 'bg-gray-800/90', badge: 'bg-amber-800 text-amber-100', header: 'from-amber-800/30 to-transparent' },
]

function LeaderAvatar({ leader, ringClass }) {
  const user = leader?.user
  const img = user?.media?.[0]?.original_url ?? user?.image
  const name = [user?.first_name, user?.last_name].filter(Boolean).join(' ')
  const fallback = `https://ui-avatars.com/api?name=${encodeURIComponent(name || '?')}`

  return (
    <div className={`aspect-square w-full h-full rounded-full p-1.5 bg-gradient-to-br ${ringClass} shadow-lg ring-2 ring-gray-900/80 box-border`}>
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-900 bg-gray-800">
        <img
          src={img || fallback}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = fallback }}
        />
      </div>
    </div>
  )
}

/**
 * Single card for top 3 leaderboard (2nd, 1st, 3rd in that order).
 * @param {Object} props
 * @param {Object|null} props.leader - Leader entry or null for empty slot
 * @param {number} props.index - 0 = 2nd, 1 = 1st, 2 = 3rd
 */
export default function TopLeaderCard({ leader, index }) {
  const style = RANK_STYLES[index]
  const isSideCard = index !== 1
  const emptyClass = isSideCard ? 'h-[220px] sm:h-[260px] sm:scale-95' : 'min-h-[200px]'
  const filledClass = style.elevate ? 'sm:-mt-4 sm:scale-105 z-10' : ''
  const sideClass = isSideCard ? 'h-[220px] sm:h-[260px] sm:scale-95 flex flex-col' : ''

  if (!leader) {
    return (
      <div
        className={`rounded-2xl border-2 ${style.border} ${style.bg} p-4 flex flex-col items-center justify-center ${emptyClass}`}
        aria-hidden
      />
    )
  }

  const user = leader.user
  const flagCode = getCountryCode(user?.country)
  return (
    <div
      className={`relative rounded-2xl border-2 ${style.border} ${style.bg} overflow-hidden shadow-xl ${filledClass} ${sideClass}`}
    >
      {style.crown && (
        <span className="absolute top-1.5 left-2 text-xl sm:text-2xl leading-none z-10" aria-hidden>
          {style.crown}
        </span>
      )}
      <span className="absolute top-1.5 right-2 text-xl sm:text-2xl leading-none z-10" aria-hidden>
        {style.medal}
      </span>
      <div className={`h-10 bg-gradient-to-b ${style.header} flex items-center justify-center`}>
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badge}`}>
          {style.label}
        </span>
      </div>
      <div className="p-4 pt-3 flex flex-col items-center text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full overflow-visible flex items-center justify-center">
          <LeaderAvatar leader={leader} ringClass={style.ring} />
        </div>
        <div className="h-4 flex-shrink-0" aria-hidden />
        <p className="text-white font-semibold text-sm sm:text-base truncate w-full mt-0">
          {user?.first_name} {user?.last_name}
        </p>
        {user?.country && (
          <div className="flex items-center justify-center gap-1.5 mt-1 w-full min-w-0 text-gray-400 text-xs">
            {flagCode && (
              <img
                src={`https://flagcdn.com/w40/${flagCode}.png`}
                alt=""
                className="h-[1em] w-auto max-w-[1.5em] object-contain rounded shrink-0 align-middle"
              />
            )}
            <span className="truncate">{user.country}</span>
          </div>
        )}
        <p className="text-primary-orange font-bold mt-2 text-sm sm:text-base">{leader.total_reward_points ?? 0} XP</p>
      </div>
    </div>
  )
}
