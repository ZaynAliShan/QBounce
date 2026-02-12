import React from 'react'

const TrainSmarter = () => {
  return (
    <section id="train-smarter" className="relative py-24 overflow-hidden bg-black">
      {/* Gradient background similar to Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/20 via-primary-orange/10 to-primary-orange/5 -z-10"></div>
      <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary-orange/15 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-primary-orange/15 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-r from-black via-primary-orange/10 to-primary-orange/20 rounded-3xl p-8 lg:p-12">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Main Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="text-white">Train Smarter Than The </span>
              <span className="text-primary-orange">Eye Can See</span>
            </h2>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
              Analyzes Your Child's Basketball Movements In Real Time-Tracking Form, Timing, And Control From A Single Phone Video.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="flex items-center justify-center w-full order-1 lg:order-2">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              {/* Image with padding and orange border */}
              <div className="p-3 border-4 border-primary-orange rounded-3xl">
                <img
                  src="/images/screenshot-basketball-tracking.png"
                  alt="Basketball movement analysis tracking"
                  className="w-full h-auto object-contain rounded-2xl"
                  onError={(e) => {
                    // Fallback to direct path if image not in public/images
                    e.target.src = "/Screenshot 2026-01-23 at 3.51.45 PM.png"
                  }}
                />
              </div>
              
              {/* Additional decorative gradient elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-orange/20 rounded-full blur-2xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-orange/20 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrainSmarter
