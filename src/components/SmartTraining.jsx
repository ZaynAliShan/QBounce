import React from 'react'

const SmartTraining = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Turning Everyday Practice Into </span>
            <span className="text-primary-orange">Real Improvement</span>
          </h2>
          
          {/* Introductory Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-primary-orange max-w-4xl mx-auto leading-relaxed">
            QBounce Pro App Brings Performance-Focused Movement Analysis To Your Phone — The Same Principles Used In Elite Training, Now Made Simple And Accessible.
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
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-orange mb-2">
                  Understanding Smart Training
                </h3>
                <p className="text-sm sm:text-base text-white">
                  How Real Skill Development Happens
                </p>
              </div>
            </div>

            {/* Main Text */}
            <p className="text-white text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
              QBounce Pro App Focuses On How Your Body Moves — Timing, Coordination, Balance, And Control. These Subtle Movement Patterns Are What Separate Random Practice From Real Improvement.
            </p>

            {/* Three Horizontal Sub-sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
              {/* Sub-section 1: WHAT IT TRACKS */}
              <div 
                className="rounded-2xl p-4 sm:p-6"
                style={{ backgroundColor: '#0f0f0f' }}
              >
                <h4 className="text-primary-orange font-bold text-sm sm:text-base mb-4">
                  What It Tracks:
                </h4>
                <ul className="space-y-2 text-white text-xs sm:text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Movement Timing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Coordination & Balance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Footwork Patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Control And Consistency</span>
                  </li>
                </ul>
              </div>

              {/* Sub-section 2: WHY IT MATTERS */}
              <div 
                className="rounded-2xl p-4 sm:p-6"
                style={{ backgroundColor: '#0f0f0f' }}
              >
                <h4 className="text-primary-orange font-bold text-sm sm:text-base mb-4">
                  Why It Matters:
                </h4>
                <ul className="space-y-2 text-white text-xs sm:text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Better Movement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Fewer Bad Habits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Safer Training</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Real Progress From Daily Practice</span>
                  </li>
                </ul>
              </div>

              {/* Sub-section 3: WHO IT'S FOR */}
              <div 
                className="rounded-2xl p-4 sm:p-6"
                style={{ backgroundColor: '#0f0f0f' }}
              >
                <h4 className="text-primary-orange font-bold text-sm sm:text-base mb-4">
                  Who It's For:
                </h4>
                <ul className="space-y-2 text-white text-xs sm:text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Kids Learning Fundamentals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Parents Wanting At-Home Structure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Solo Athletes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-orange mr-2">•</span>
                    <span>Coaches</span>
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
