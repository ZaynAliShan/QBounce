import React from 'react'
import { FaUser, FaSyncAlt } from 'react-icons/fa'

const WhatWeProvide = () => {
  const features = [
    {
      icon: <img src="/images/crosshairs-icon.png" alt="Crosshairs aim icon" className="w-20 h-20 object-contain" />,
      title: 'Sport-Specific Training',
      description: 'Built for basketball—covering ball handling, footwork, coordination, and game-ready mechanics with basketball-specific drills and language.',
    },
    {
      icon: <FaUser className="w-14 h-14" />,
      title: 'AGE-APPROPRIATE COACHING',
      description: 'Smart training paths for kids, teens, and adults—whether you\'re just starting or leveling up competitively.',
    },
    {
      icon: <img src="/images/book-icon.png" alt="Open book icon" className="w-20 h-20 object-contain" />,
      title: 'SKILL-SCIENCE BASED',
      description: 'Designed using proven training principles used by elite coaches to build real skills like control, reaction time, and muscle memory.',
    },
    {
      icon: (
        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      ),
      title: 'ALWAYS IMPROVING',
      description: 'Regularly updated with new drills, challenges, and progress tracking to keep training fresh, fun, and effective.',
    },
  ]

  return (
    <section id="what-we-provide" className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">What We</span>
            <span className="text-primary-orange"> Provide</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive training solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 hover:border-primary-orange/50 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="mb-4">
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center text-primary-orange" style={{ backgroundColor: '#262926' }}>
                    {feature.icon}
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-2xl font-bold text-primary-orange mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeProvide
