import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { get } from '../lib/api'
import { getCountryCode } from '../lib/countries'
import TopLeaderCard from '../components/leaderboard/TopLeaderCard'

const TYPES = [
  { key: 'overall', label: 'Overall' },
  { key: 'month', label: 'Monthly' },
  { key: 'week', label: 'Weekly' },
]

const defaultAvatar = (user) =>
  `https://ui-avatars.com/api?name=${encodeURIComponent((user?.first_name || '') + ' ' + (user?.last_name || ''))}`

function Avatar({ user, className = '' }) {
  const src = user?.media?.[0]?.original_url ?? user?.image ?? defaultAvatar(user)
  return (
    <img
      src={src}
      alt=""
      className={`object-cover rounded-full ${className}`}
      onError={(e) => { e.target.src = defaultAvatar(user) }}
    />
  )
}

export default function LeaderboardPage() {
  const [type, setType] = useState('overall')
  const [leaders, setLeaders] = useState([])
  const [userRank, setUserRank] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    async function fetchLeaderboard() {
      try {
        const res = await get(`/leaderboard/${type}`)
        if (!cancelled) {
          setLeaders(res?.data?.leaders ?? [])
          setUserRank(res?.data?.user ?? null)
        }
      } catch {
        if (!cancelled) setLeaders([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchLeaderboard()
    return () => { cancelled = true }
  }, [type])

  const top3 = [leaders[1], leaders[0], leaders[2]] // 2nd, 1st, 3rd (same order as home)
  const rest = leaders.slice(3)

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 pt-24 sm:pt-28 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-wide">
              Leaderboard
            </h1>
            <Link
              to="/home"
              className="text-primary-orange font-medium hover:underline"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="flex gap-2 mb-6">
            {TYPES.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setType(t.key)}
                className={`
                  flex-1 sm:flex-none capitalize px-4 py-2 rounded-xl font-semibold text-sm sm:text-base transition-colors
                  ${type === t.key ? 'bg-primary-orange text-black' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}
                `}
              >
                {t.label}
              </button>
            ))}
          </div>

          {loading && (
            <div
              className="rounded-2xl border border-gray-800 bg-gray-900/70 p-8 sm:p-10 flex flex-col items-center justify-center gap-4 text-center"
              role="status"
              aria-live="polite"
              aria-label="Loading leaderboard…"
            >
              <img
                src="/images/loader.gif"
                alt=""
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                aria-hidden
              />
              <p className="text-gray-400 text-sm">Loading leaderboard…</p>
            </div>
          )}

          {!loading && (
            <>
              {userRank && (
                <div className="rounded-2xl border-2 border-primary-orange/50 bg-gray-900/80 p-4 mb-6 flex items-center justify-between shadow-lg">
                  <span className="text-white font-semibold">Your rank</span>
                  <span className="text-primary-orange font-bold">#{userRank.rank ?? '—'} · {userRank.total_reward_points ?? 0} XP</span>
                </div>
              )}

              {leaders.length === 0 && (
                <p className="text-gray-500 text-center py-8">No leaderboard data yet.</p>
              )}

              {leaders.length > 0 && (
                <>
                  {/* Top 3 cards (same design as /home leaderboard): 2nd, 1st, 3rd */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-3xl mx-auto items-end mb-8">
                    {top3.map((leader, index) => (
                      <TopLeaderCard key={leader?.user?.id ?? `top3-${index}`} leader={leader} index={index} />
                    ))}
                  </div>

                  {/* Table from 4th onward */}
                  {rest.length > 0 && (
                    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-sm font-semibold">
                              <th className="py-3 px-4 w-14">#</th>
                              <th className="py-3 px-4">Player</th>
                              <th className="py-3 px-4 hidden sm:table-cell">Country</th>
                              <th className="py-3 px-4 text-right">XP</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rest.map((leader, i) => {
                              const user = leader.user
                              const rank = i + 4
                              const isYou = user?.id === userRank?.user_id || leader.user_id === userRank?.user_id
                              const flagCode = getCountryCode(user?.country)
                              return (
                                <tr
                                  key={user?.id ?? i}
                                  className="border-b border-gray-800/80 hover:bg-gray-800/40 transition-colors last:border-b-0"
                                >
                                  <td className="py-3 px-4 text-gray-500 font-bold">#{rank}</td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700 flex-shrink-0">
                                        <Avatar user={user} className="w-full h-full" />
                                      </div>
                                      <span className="text-white font-medium truncate max-w-[140px] sm:max-w-none">
                                        {user?.first_name} {user?.last_name}
                                        {isYou && <span className="text-primary-orange ml-1">(You)</span>}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 hidden sm:table-cell">
                                    <div className="flex items-center gap-2 text-gray-400">
                                      {flagCode && (
                                        <img
                                          src={`https://flagcdn.com/w40/${flagCode}.png`}
                                          alt=""
                                          className="w-6 h-4 object-cover rounded shrink-0"
                                        />
                                      )}
                                      <span className="truncate max-w-[120px]">{user?.country ?? '—'}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-right text-primary-orange font-bold">{leader.total_reward_points ?? 0} XP</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
