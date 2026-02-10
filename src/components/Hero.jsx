import React from 'react'
import AnalyzePerformance from './AnalyzePerformance'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 bg-black" style={{ overflowX: 'hidden' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center pt-16 sm:pt-0">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Track Every </span>
              <span className="text-primary-orange">Move.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-white mb-8 max-w-2xl leading-relaxed">
              Advanced AI analyzes every move, shot, and play - turning footage into actionable insights instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 mb-12">
              <a
                href="https://apps.apple.com/us/app/qbounce-pro/id6743074736"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 transform hover:scale-105"
              >
                <img
                  src="/images/app store.webp"
                  alt="Get the App on App Store"
                  className="h-12 lg:h-20 w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.app.q_bounce&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 transform hover:scale-105"
              >
                <img
                  src="/images/google play.webp"
                  alt="Get the App on Google Play"
                  className="h-12 lg:h-20 w-auto"
                />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Trusted by Athletes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Sensors Required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span>Real-time Analysis</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image with Overlapping Component */}
          <div className="flex items-center justify-center w-full relative overflow-visible">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Orangish gradient background around image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/20 via-primary-orange/10 to-primary-orange/5 rounded-full blur-3xl -z-10 scale-110"></div>
              
              {/* Image */}
              <img
                src="/images/hero-image.jpg"
                alt="QBounce AI Analysis - Your Path to Mastery Begins Now"
                className="w-full h-auto object-contain mx-auto relative z-10 rounded-4xl"
                style={{
                  maxWidth: '100%',
                  maxHeight: 'min(70vh, 600px)',
                  width: 'auto',
                  height: 'auto',
                }}
                onError={(e) => {
                  console.error('Failed to load hero image')
                }}
              />
              
              {/* Additional decorative gradient elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-orange/15 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary-orange/15 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-primary-orange/20 rounded-full blur-2xl -z-10"></div>

              {/* Analyze Performance Component - Overlapping on the left side of image */}
              <div 
                className="absolute top-1/2 hidden lg:block"
                style={{ 
                  zIndex: 50,
                  pointerEvents: 'auto',
                  right: '100%',
                  transform: 'translateY(-100%) translateX(50%)',
                  width: 'max-content'
                }}
              >
                <AnalyzePerformance />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
        <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
