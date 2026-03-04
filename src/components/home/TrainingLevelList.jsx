import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../../lib/api'

const CATEGORIES = [
  { key: 'beginner', label: 'Beginner', level: 1 },
  { key: 'advanced', label: 'Advanced', level: 2 },
  { key: 'pro', label: 'Pro', level: 3 },
  { key: 'master', label: 'Master', level: 4 },
]

export default function TrainingLevelList({ activeCategory, onCategoryChange }) {
  const category = activeCategory || 'beginner'
  const [data, setData] = useState(null)
  const [currentVideoId, setCurrentVideoId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!category) return
    let cancelled = false
    setLoading(true)
    async function fetchPrograms() {
      try {
        const res = await get(`/trainingPrograms/${category}`)
        if (cancelled || !res?.data) return
        setData(res.data)
        setCurrentVideoId(res.data.currentVideoId ?? null)
      } catch {
        if (!cancelled) setData(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchPrograms()
    return () => { cancelled = true }
  }, [category])

  return (
    <div className="space-y-6">
      {/* Level buttons: switch category for the list only */}
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map(({ key, label, level }) => (
          <button
            key={key}
            type="button"
            onClick={() => onCategoryChange?.(key)}
            disabled={loading}
            className={`
              capitalize border-2 rounded-xl p-3 sm:p-4 flex items-center gap-3 font-bold text-left transition-colors
              ${category === key
                ? 'bg-primary-orange border-primary-orange text-black'
                : 'border-gray-700 text-white hover:border-primary-orange/50 bg-gray-800/50'}
              ${loading ? 'opacity-80 cursor-wait' : ''}
            `}
          >
            <span className="text-2xl opacity-80">🏀</span>
            <div className="flex flex-col min-w-0">
              <span className={`text-xs font-medium ${category === key ? 'text-black/80' : 'text-gray-400'}`}>
                Level {level}
              </span>
              <span className="truncate">{label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Drill list: unlocked = link to training page, locked = disabled */}
      <div className="space-y-2">
        <h3 className="text-white font-semibold">Drills</h3>
        {loading && (
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 flex flex-col items-center justify-center gap-3 min-h-[120px]" role="status" aria-live="polite" aria-label="Loading drills">
            <img src="/images/loader.gif" alt="" className="h-12 w-12 object-contain" aria-hidden />
            <p className="text-gray-400 text-sm">Loading drills…</p>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 rounded-xl bg-gray-800/80 animate-pulse" aria-hidden />
              ))}
            </div>
          </div>
        )}
        {!loading && !data && (
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 text-gray-500 text-center text-sm">
            Loading…
          </div>
        )}
        {!loading && data?.unlocked?.map((v) => (
          <Link
            key={v.id}
            to={`/train/${category}/${v.id}`}
            className={`
              block w-full px-4 py-3 rounded-xl font-semibold text-left capitalize transition-colors border-2
              ${Number(currentVideoId) === Number(v.id)
                ? 'bg-primary-orange border-primary-orange text-black'
                : 'bg-gray-800/80 border-gray-700 text-white hover:border-primary-orange/50'}
            `}
          >
            <span className="flex justify-between items-center">
              {v.title}
              <svg className="w-5 h-5 text-current opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
        {!loading && data?.locked?.map((v) => (
          <div
            key={v.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-gray-500 bg-gray-800/50 border-2 border-gray-700 capitalize cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {v.title}
          </div>
        ))}
      </div>
    </div>
  )
}
