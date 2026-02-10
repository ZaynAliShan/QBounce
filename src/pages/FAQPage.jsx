import React from 'react'
import Header from '../components/Header'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

function FAQPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-20">
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default FAQPage
