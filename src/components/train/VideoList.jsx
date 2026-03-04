import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../../lib/api'

export default function VideoList({ category, activeVideoId, onFirstUnlocked }) {
  const [locked, setLocked] = useState([])
  const [unlocked, setUnlocked] = useState([])

  useEffect(() => {
    if (!category) return
    let cancelled = false
    async function fetchPrograms() {
      try {
        const res = await get(`/trainingPrograms/${category}`)
        if (cancelled || !res?.data) return
        setLocked(res.data.locked || [])
        setUnlocked(res.data.unlocked || [])
        const first = res.data.unlocked?.[0]?.id ?? res.data.locked?.[0]?.id
        if (first != null) onFirstUnlocked(first)
      } catch {
        if (!cancelled) {
          setLocked([])
          setUnlocked([])
        }
      }
    }
    fetchPrograms()
    return () => { cancelled = true }
  }, [category, onFirstUnlocked])

  return (
    <div className="flex flex-col gap-2">
      {unlocked.map((v) => (
        <Link
          key={v.id}
          to={`/train/${category}/${v.id}`}
          className={`
            block text-left w-full px-3 py-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base text-white capitalize transition-colors min-h-[44px] flex items-center
            ${Number(activeVideoId) === Number(v.id)
              ? 'bg-primary-orange text-black border-2 border-primary-orange'
              : 'bg-gray-800/80 border-2 border-gray-700 hover:border-primary-orange/50'}
          `}
        >
          {v.title}
        </Link>
      ))}
      {locked.map((v) => (
        <div
          key={v.id}
          className="flex items-center gap-2 px-3 py-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base text-gray-500 bg-gray-800/50 border-2 border-gray-700 capitalize cursor-not-allowed min-h-[44px]"
        >
          <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          {v.title}
        </div>
      ))}
    </div>
  )
}
