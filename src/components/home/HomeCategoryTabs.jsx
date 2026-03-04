import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { get } from '../../lib/api'

const CATEGORIES = ['beginner', 'advanced', 'pro', 'master']

function categoryLevel(name) {
  const i = CATEGORIES.indexOf(name)
  return i === -1 ? 1 : i + 1
}

/** On Home: clicking a category goes to training page with that category and videoId 0 */
export default function HomeCategoryTabs({ activeCategory }) {
  const navigate = useNavigate()
  const [userCategoryLevel, setUserCategoryLevel] = useState(1)

  useEffect(() => {
    let cancelled = false
    async function fetchUser() {
      try {
        const res = await get('/user-details')
        if (!cancelled && res?.data?.category_name) {
          setUserCategoryLevel(categoryLevel(res.data.category_name))
        }
      } catch {
        // keep default
      }
    }
    fetchUser()
    return () => { cancelled = true }
  }, [])

  const goToTraining = (cat) => {
    navigate(`/train/${cat}/0`)
  }

  const active = activeCategory && CATEGORIES.includes(activeCategory) ? activeCategory : 'beginner'

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 py-6">
      {CATEGORIES.map((cat) => {
        const level = categoryLevel(cat)
        const locked = userCategoryLevel < level
        const isActive = active === cat
        return (
          <button
            key={cat}
            type="button"
            onClick={() => !locked && goToTraining(cat)}
            disabled={locked}
            className={`
              capitalize border-2 min-w-0 min-w-[80px] sm:min-w-[100px] h-10 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5 px-2 sm:px-3 overflow-hidden
              ${isActive ? 'bg-primary-orange border-primary-orange text-black' : 'border-gray-600 text-white hover:border-primary-orange/50'}
              ${locked ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            <span className="truncate min-w-0">{cat}</span>
            {locked && (
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )
      })}
    </div>
  )
}
