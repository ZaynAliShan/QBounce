import React, { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import WhatWeProvide from '../components/WhatWeProvide'
import SmartTraining from '../components/SmartTraining'
import HowItWorks from '../components/HowItWorks'
import TrainSmarter from '../components/TrainSmarter'
import SportsMetrics from '../components/SportsMetrics'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import DownloadModal from '../components/DownloadModal'

function HomePage() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      <Header onGetStartedClick={() => setShowDownloadModal(true)} />
      <DownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
      <Hero />
      <Features />
      <WhatWeProvide />
      <SmartTraining />
      <HowItWorks />
      <TrainSmarter />
      <SportsMetrics />
      <Testimonials />
      <Pricing onStartFreeTrialClick={() => setShowDownloadModal(true)} />
      <Footer />
    </div>
  )
}

export default HomePage
