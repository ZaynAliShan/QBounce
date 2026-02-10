import React from 'react'

const SportsMetrics = () => {
  const sports = [
    {
      name: 'Basketball',
      metrics: ['Shot Arc', 'Release Angle', 'Follow Through', 'Jump Height', 'Landing Mechanics'],
      image: '🏀',
    },
    {
      name: 'Soccer',
      metrics: ['Kick Power', 'Ball Contact', 'Body Position', 'Strike Angle', 'Follow Through'],
      image: '⚽',
    },
    {
      name: 'Baseball',
      metrics: ['Bat Speed', 'Swing Plane', 'Hip-Shoulder Separation', 'Launch Angle', 'Follow Through'],
      image: '⚾',
    },
    {
      name: 'Golf',
      metrics: ['Swing Plane', 'Club Speed', 'Impact Position', 'Body Rotation', 'Follow Through'],
      image: '⛳',
    },
    {
      name: 'Tennis',
      metrics: ['Serve Speed', 'Racket Angle', 'Body Rotation', 'Follow Through', 'Footwork'],
      image: '🎾',
    },
    {
      name: 'Volleyball',
      metrics: ['Jump Height', 'Spike Angle', 'Approach Speed', 'Arm Swing', 'Landing'],
      image: '🏐',
    },
  ]

  return (
    <section id="sports" className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Track Metrics for</span>
            <br />
            <span className="text-primary-orange">Every Sport</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced AI analysis for multiple sports with sport-specific metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-primary-orange/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{sport.image}</span>
                <h3 className="text-2xl font-bold text-white">{sport.name}</h3>
              </div>
              <ul className="space-y-2">
                {sport.metrics.map((metric, metricIndex) => (
                  <li key={metricIndex} className="flex items-center gap-2 text-gray-400">
                    <svg className="w-4 h-4 text-primary-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            And many more sports coming soon...
          </p>
          <a
            href="#download"
            className="inline-block bg-primary-orange text-black px-8 py-3 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors duration-200"
          >
            See All Sports
          </a>
        </div>
      </div>
    </section>
  )
}

export default SportsMetrics
