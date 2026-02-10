import React, { useState } from 'react'

const faqData = [
  {
    id: 1,
    question: "What's included in the product?",
    answer:
      "The package includes the QBounce Basketball Training Mat, access to the app with a free trial period, and a variety of training sessions and exercise programs.",
  },
  {
    id: 2,
    question: 'What is the QBounce Pro app?',
    answer:
      'The QBounce Pro app is a training app that guides you through basketball drills, tracks your progress, and helps you improve your skills over time.',
  },
  {
    id: 3,
    question: 'How does the app work with the QBounce mat?',
    answer:
      "The app provides footwork drills that align with the mat's markers, guiding you on where to step and how to move for effective training.",
  },
  {
    id: 4,
    question: 'How do I set up the QBounce mat and the app?',
    answer:
      'Place the mat on a flat, stable surface, then scan the QR code to download the app. Follow the in-app steps to start your training journey.',
  },
  {
    id: 5,
    question: 'How effective is the QBounce mat in terms of performance?',
    answer:
      "The QBounce mat enhances footwork, coordination, and focus. With its visual markers and paired app drills, it's designed to build game-ready skills even in small spaces. Regular use delivers fast, noticeable results.",
  },
  {
    id: 6,
    question: 'How does the QBounce app monitor my progress?',
    answer:
      'The app tracks XP points, training time, completed drills, and streaks. You can earn trophies, climb the leaderboard, and view all your stats in one place.',
  },
  {
    id: 7,
    question: "What's the shipping process like?",
    answer:
      'Orders are processed within 1–2 business days and shipped free worldwide. U.S. shipping takes 1–2 weeks via USPS, and international orders take 10–20 days. You\'ll receive a tracking link once shipped.',
  },
  {
    id: 8,
    question: 'Is the QBounce mat good for beginners?',
    answer:
      "Yes, it's beginner-friendly. The visual markers make learning foot placement, balance, and movement easy for players of all skill levels.",
  },
  {
    id: 9,
    question: 'What skills can I develop using the QBounce mat?',
    answer:
      'You can improve footwork accuracy, speed, balance, jab steps, coordination, defensive slides, and more. Paired with the app, you get structured workouts and progress tracking.',
  },
  {
    id: 10,
    question: 'Can I use the QBounce mat at home?',
    answer:
      'Yes. The mat is designed for indoor spaces like bedrooms, basements, and garages. Its non-slip bottom ensures stability on most surfaces for safe home training.',
  },
  {
    id: 11,
    question: 'Do I need the full QBounce mat system to use the mat effectively?',
    answer:
      'You can use the mat alone for visual drills, but for best results, pair it with the Silent Basketball and QBounce Pro app for guided drills and performance tracking.',
  },
  {
    id: 12,
    question: "What's the difference between the QBounce mat and other training tools?",
    answer:
      'The QBounce mat is unique due to its visual guidance, portability, quiet use, and app integration. Unlike cones or tape, it stays in place and supports real footwork training indoors.',
  },
  {
    id: 13,
    question: 'Is the QBounce mat durable and safe for repeated use?',
    answer:
      "Yes, it's built from high-quality, grippy materials that handle intense use without sliding or wearing out.",
  },
  {
    id: 14,
    question: 'Is the app compatible with all smartphones?',
    answer:
      'Yes, the QBounce app works with both iOS and Android devices, making it accessible for all users.',
  },
  {
    id: 15,
    question: "Can I return the QBounce mat if I'm not satisfied?",
    answer:
      'Yes, returns are accepted under our return policy, which can be found on our website.',
  },
]

const FAQ = () => {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-primary-orange font-semibold tracking-widest text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4">
            FAQs
          </h1>
          <p className="text-gray-400 text-lg">
            Welcome to QBounce, your ticket to unlocking extraordinary basketball
            skills and taking your training to the next level.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden transition-colors hover:border-primary-orange/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 sm:px-6 sm:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange focus-visible:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <span className="font-semibold text-white text-base sm:text-lg pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-primary-orange transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-4 sm:px-6 sm:pb-5 pt-0">
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed border-t border-gray-800 pt-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
