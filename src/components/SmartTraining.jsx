import React from 'react'

const SmartTraining = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6">
            <span className="text-white">TURNING EVERYDAY PRACTICE INTO </span>
            <span className="text-primary-orange">REAL IMPROVEMENT</span>
          </h2>
          
          {/* Introductory Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-primary-orange uppercase max-w-4xl mx-auto leading-relaxed">
            QBOUNCE PRO APP BRINGS PERFORMANCE-FOCUSED MOVEMENT ANALYSIS TO YOUR PHONE — THE SAME PRINCIPLES USED IN ELITE TRAINING, NOW MADE SIMPLE AND ACCESSIBLE.
          </p>
        </div>

        {/* Main Content Box */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div 
            className="rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12"
            style={{
              border: '2px solid #C26500',
              boxShadow: '0 0 20px rgba(194, 101, 0, 0.3)',
              backgroundColor: '#1a1a1a'
            }}
          >
            {/* Box Header */}
            <div className="flex items-start gap-4 mb-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <svg 
                  className="w-8 h-8 sm:w-10 sm:h-10 text-primary-orange" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              
              {/* Title and Subtitle */}
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-orange uppercase mb-2">
                  UNDERSTANDING SMART TRAINING
                </h3>
                <p className="text-sm sm:text-base text-white uppercase">
                  HOW REAL SKILL DEVELOPMENT HAPPENS
                </p>
              </div>
            </div>

            {/* Main Text */}
            <p className="text-white text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
              QBOUNCE PRO APP FOCUSES ON HOW YOUR BODY MOVES — TIMING, COORDINATION, BALANCE, AND CONTROL. THESE SUBTLE MOVEMENT PATTERNS ARE WHAT SEPARATE RANDOM PRACTICE FROM REAL IMPROVEMENT.
            </p>

            {/* Three Horizontal Sub-sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
              {/* Sub-section 1: WHAT IT TRACKS */}
              <div 
                className="rounded-2xl p-4 sm:p-6"
                style={{ backgroundColor: '#0f0f0f' }}
              >
                <h4 className="text-primary-orange font-bold text-sm sm:text-base uppercase mb-4">
                  WHAT IT TRACKS:
                </h4>
                <ul className="space-y-2 text-white text-xs sm:text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>MOVEMENT TIMING</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>COORDINATION & BALANCE</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>FOOTWORK PATTERNS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>CONTROL AND CONSISTENCY</span>
                  </li>
                </ul>
              </div>

              {/* Sub-section 2: WHY IT MATTERS */}
              <div 
                className="rounded-2xl p-4 sm:p-6"
                style={{ backgroundColor: '#0f0f0f' }}
              >
                <h4 className="text-primary-orange font-bold text-sm sm:text-base uppercase mb-4">
                  WHY IT MATTERS:
                </h4>
                <ul className="space-y-2 text-white text-xs sm:text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>BETTER MOVEMENT</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>FEWER BAD HABITS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>SAFER TRAINING</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>REAL PROGRESS FROM DAILY PRACTICE</span>
                  </li>
                </ul>
              </div>

              {/* Sub-section 3: WHO IT'S FOR */}
              <div 
                className="rounded-2xl p-4 sm:p-6"
                style={{ backgroundColor: '#0f0f0f' }}
              >
                <h4 className="text-primary-orange font-bold text-sm sm:text-base uppercase mb-4">
                  WHO IT'S FOR:
                </h4>
                <ul className="space-y-2 text-white text-xs sm:text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>KIDS LEARNING FUNDAMENTALS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>PARENTS WANTING AT-HOME STRUCTURE</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>SOLO ATHLETES</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>COACHES</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SmartTraining
