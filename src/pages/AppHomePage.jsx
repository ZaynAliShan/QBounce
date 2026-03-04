import React, { useCallback, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeCategoryTabs from '../components/home/HomeCategoryTabs'
import UserCard from '../components/home/UserCard'
import TrainingLevelList from '../components/home/TrainingLevelList'
import LeaderboardSection from '../components/home/LeaderboardSection'

export default function AppHomePage() {
  const [activeCategory, setActiveCategory] = useState('beginner')

  const handleUserLoaded = useCallback((categoryName) => {
    if (categoryName && ['beginner', 'advanced', 'pro', 'master'].includes(categoryName)) {
      setActiveCategory(categoryName)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="h-6 sm:h-8" />
          <HomeCategoryTabs activeCategory={activeCategory} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            <aside className="lg:col-span-4">
              <UserCard onUserLoaded={handleUserLoaded} />
            </aside>
            <section className="lg:col-span-8">
              <TrainingLevelList activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </section>
          </div>
          <LeaderboardSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
