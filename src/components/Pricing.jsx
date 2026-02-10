import React from 'react'

const Pricing = ({ onStartFreeTrialClick }) => {
  const plans = [
    {
      name: 'Starter',
      price: '$9.99',
      period: '/month',
      description: 'Perfect for individual athletes',
      features: [
        '5 video analyses per month',
        'Basic metrics tracking',
        'Personalized feedback',
        'Progress dashboard',
        'Email support',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: '$19.99',
      period: '/month',
      description: 'For serious athletes and coaches',
      features: [
        'Unlimited video analyses',
        'Advanced biomechanics analysis',
        '3D motion capture',
        'AI-powered coaching drills',
        'Multi-sport support',
        'Priority support',
        'Export reports',
      ],
      popular: true,
    },
    {
      name: 'Team',
      price: 'Custom',
      period: '',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team management dashboard',
        'Bulk analysis tools',
        'Custom integrations',
        'Dedicated account manager',
        'Training programs',
        'API access',
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Simple, Transparent</span>
            <br />
            <span className="text-primary-orange">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 7-day free trial.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-gray-900/50 border rounded-2xl p-8 ${
                  plan.popular
                    ? 'border-primary-orange scale-105 shadow-lg shadow-primary-orange/20'
                    : 'border-gray-800'
                } hover:border-primary-orange/50 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-orange text-black px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-primary-orange flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === 'Team' ? (
                  <a
                    href="#contact"
                    className="block w-full text-center py-3 rounded-lg font-semibold transition-colors duration-200 bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
                  >
                    Contact Sales
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onStartFreeTrialClick?.()}
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      plan.popular
                        ? 'bg-primary-orange text-black hover:bg-primary-orange/90'
                        : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    Start Free Trial
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            All plans include a 30-day money-back guarantee
          </p>
          <a href="#contact" className="text-primary-orange hover:underline">
            Have questions? Contact us
          </a>
        </div>
      </div>
    </section>
  )
}

export default Pricing
