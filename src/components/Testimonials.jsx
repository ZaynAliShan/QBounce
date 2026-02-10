import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      image: '/images/testimonials/testimonial-1.jpg',
    },
    {
      image: '/images/testimonials/testimonial-2.jpg',
    },
    {
      image: '/images/testimonials/testimonial-3.jpg',
    },
    {
      image: '/images/testimonials/testimonial-4.jpg',
    },
    {
      image: '/images/testimonials/testimonial-5.jpg',
    },
    {
      image: '/images/testimonials/testimonial-6.jpg',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Trusted by</span>
            <span className="text-primary-orange"> Champions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what athletes and coaches are saying about QBounce
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-primary-orange/50 transition-all duration-300"
            >
              <img
                src={testimonial.image}
                alt={`Testimonial ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-900/50 border border-gray-800 rounded-lg px-6 py-3">
            <svg className="w-6 h-6 text-primary-orange" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-semibold">Trusted by 100,000+ Athletes Worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
