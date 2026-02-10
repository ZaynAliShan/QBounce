import React from 'react'

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload Film',
      description: 'Record or upload a video of your swing, pitch or throw from your phone.',
      image: '/images/HIW-1.png',
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our AI instantly processes your video and breaks down your mechanics.',
      image: '/images/HIW-2.png',
    },
    {
      number: '03',
      title: 'Improvement Plan',
      description: 'Get Detailed metrics and personalized tips to improve your technique.',
      image: '/images/HIW-3.png',
    },
    {
      number: '04',
      title: 'Track Progress',
      description: 'See your improvement over time with comprehensive performance tracking.',
      image: '/images/HIW-4.png',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">How It</span>
            <span className="text-primary-orange"> Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four simple steps to transform your performance
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-primary-orange/50 transition-all duration-300 flex flex-col text-center">
                {/* Image - Fixed height container */}
                <div className="mb-6 rounded-xl overflow-hidden h-80 flex items-center justify-center bg-gray-900">
                  <img 
                    src={step.image} 
                    alt={`Step ${step.number}: ${step.title}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Step Number in H1 */}
                <h1 className="text-4xl font-bold text-primary-orange mb-3">
                  {step.number}
                </h1>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed flex-grow">
                  {step.description}
                </p>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
