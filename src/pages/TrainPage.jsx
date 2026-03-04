import React, { useCallback, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import VideoCategoryTabs from '../components/train/VideoCategoryTabs'
import UserDetailsBar from '../components/train/UserDetailsBar'
import VideoList from '../components/train/VideoList'
import VideoPlayer from '../components/train/VideoPlayer'

const VALID_CATEGORIES = ['beginner', 'advanced', 'pro', 'master']

export default function TrainPage() {
  const { category, videoId } = useParams()
  const [firstUnlocked, setFirstUnlocked] = useState(null)

  const isCategoryValid = category && VALID_CATEGORIES.includes(category)
  const effectiveCategory = isCategoryValid ? category : 'beginner'

  const normalizedVideoId = videoId === undefined || videoId === '' ? 0 : Number(videoId)
  const effectiveVideoId = normalizedVideoId === 0 ? firstUnlocked : normalizedVideoId

  const setFirstUnlockedStable = useCallback((id) => {
    setFirstUnlocked((prev) => (prev != null ? prev : id))
  }, [])

  useEffect(() => {
    setFirstUnlocked(null)
  }, [effectiveCategory])

  if (!category) {
    return <Navigate to="/train/beginner/0" replace />
  }

  if (!isCategoryValid) {
    return <Navigate to="/train/beginner/0" replace />
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-14 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="h-4 sm:h-6 md:h-8" />
          <VideoCategoryTabs />
          <UserDetailsBar />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mt-4 sm:mt-6">
            <aside className="md:col-span-4 lg:col-span-4 order-2 md:order-1">
              <h2 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">Drills</h2>
              <VideoList
                category={effectiveCategory}
                activeVideoId={effectiveVideoId}
                onFirstUnlocked={setFirstUnlockedStable}
              />
            </aside>
            <section className="md:col-span-8 lg:col-span-8 order-1 md:order-2">
              <VideoPlayer videoId={effectiveVideoId} />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
