import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Profile</h1>
          <p className="text-gray-400 mb-6">Profile page — complete your details here.</p>
          <Link to="/home" className="text-primary-orange font-medium hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
