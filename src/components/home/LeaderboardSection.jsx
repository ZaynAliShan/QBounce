import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../../lib/api'
import TopLeaderCard from '../leaderboard/TopLeaderCard'

const TYPES = [
  { key: 'overall', label: 'Overall' },
  { key: 'month', label: 'Monthly' },
  { key: 'week', label: 'Weekly' },
]

export default function LeaderboardSection() {
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

  const top3 = [leaders[1], leaders[0], leaders[2]]

  return (
    <section className="mt-12 sm:mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
          Leaderboard
        </h2>
        <Link
          to="/leaderboard"
          className="inline-flex items-center justify-center rounded-xl bg-primary-orange text-black font-semibold px-6 py-2.5 hover:bg-primary-orange/90 transition-colors w-full sm:w-auto shadow-lg shadow-primary-orange/20"
        >
          All Score
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
              ${type === t.key ? 'bg-primary-orange text-black shadow-lg shadow-primary-orange/20' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="rounded-2xl border-2 border-gray-800 bg-gray-900/50 p-8 text-center text-gray-500">
          Loading leaderboard…
        </div>
      )}

      {!loading && top3.some(Boolean) && (
        <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-3xl mx-auto items-end">
          {top3.map((leader, index) => (
            <TopLeaderCard key={leader?.user?.id ?? `leader-${index}`} leader={leader} index={index} />
          ))}
        </div>
      )}

      {!loading && !top3.some(Boolean) && (
        <div className="rounded-2xl border-2 border-gray-800 bg-gray-900/50 p-8 text-center text-gray-500">
          No leaderboard data yet.
        </div>
      )}
    </section>
  )
}
