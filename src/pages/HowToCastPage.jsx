import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const IMG = {
  first: '/how-to-cast/first.webp',
  second: '/how-to-cast/second.webp',
  third: '/how-to-cast/third.webp',
  fourth: '/how-to-cast/fourth.webp',
  fifth: '/how-to-cast/fifth.webp',
  sixth: '/how-to-cast/sixth.webp',
  seventh: '/how-to-cast/seventh.webp',
  eighth: '/how-to-cast/8th.png',
}

const STEPS = [
  {
    num: 1,
    title: 'Make Sure Your PC and TV Are Ready',
    image: IMG.first,
    imageAlt: 'TV remote and TV setup',
    bullets: [
      'Ensure that both your PC and TV are connected to the same Wi-Fi network.',
      'Your TV should be plugged in, turned on, and set to the correct input (e.g., HDMI, if using a casting device like Chromecast or a smart TV with built-in casting support).',
    ],
  },
  {
    num: 2,
    title: 'Open Google Chrome on Your PC',
    image: IMG.second,
    imageAlt: 'Google Chrome browser',
    paragraph:
      "Make sure you are using the Google Chrome browser on your PC. If you haven't installed it yet, download and install it from the official Google Chrome website.",
  },
  {
    num: 3,
    title: 'Navigate to the QBounce Mat Web App',
    image: IMG.third,
    imageAlt: 'QBounce Mat Web App',
    bullets: [
      'In Google Chrome, go to the QBounce Mat App by typing QBounce.com into the address bar or selecting it from your bookmarks.',
      'Make sure the QBounce Mat Web App is fully loaded and ready to use. This is the app you\'ll be casting to your TV for an interactive training session.',
    ],
  },
  {
    num: 4,
    title: 'Open the Google Chrome Menu (Three Dots)',
    image: IMG.fourth,
    imageAlt: 'Chrome menu three dots',
    bullets: [
      'In the top-right corner of your Google Chrome window, click on the three vertical dots (the "More" menu) next to the address bar.',
      'This will open a dropdown menu with various options.',
    ],
  },
  {
    num: 5,
    title: "Select 'Cast' from the Dropdown Menu",
    image: IMG.fifth,
    imageAlt: 'Cast option in Chrome menu',
    bullets: [
      "From the dropdown menu, click on 'Cast'.",
      'A pop-up window will appear showing the list of available devices that you can cast to.',
    ],
  },
  {
    num: 6,
    title: 'Choose Your TV or Casting Device',
    image: IMG.sixth,
    imageAlt: 'Casting device list',
    bullets: [
      'In the list of available devices, find and select your TV or casting device (e.g., Chromecast or a smart TV with casting support).',
      "If your TV doesn't appear in the list, make sure: Your TV is powered on.",
      "It's set to the correct input (e.g., HDMI).",
      'Both the TV and PC are connected to the same Wi-Fi network.',
    ],
  },
  {
    num: 7,
    title: "Select 'Cast Tab' (Optional)",
    image: IMG.seventh,
    imageAlt: 'Cast tab option',
    bullets: [
      "At the bottom of the casting window, click on the 'Sources' dropdown and select 'Cast tab'.",
      "This option will cast only the current tab that is open in Google Chrome. This is ideal if you want to continue browsing or working on other tasks while the QBounce app remains on your TV.",
    ],
  },
  {
    num: 8,
    title: 'Enjoy Using the QBounce Web App on Your TV',
    image: IMG.eighth,
    imageAlt: 'QBounce app on TV',
    bullets: [
      'Now that everything is set up, your QBounce Mat App should be visible on your TV screen.',
      'Enjoy the interactive QBounce Mat training experience on the big screen.',
      'Move and track your progress while training with the mat, and have fun engaging with the app on a larger display.',
    ],
  },
]

function HowToCastPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="border-b border-gray-800/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How to Cast QBounce to Your TV
            </h1>
          </div>
        </section>

        {/* Steps */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-12 lg:space-y-16">
              {STEPS.map((step, index) => (
                <article
                  key={step.num}
                  className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center"
                >
                  {/* Step number + image */}
                  <div className={`w-full lg:w-[45%] shrink-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-orange text-black text-sm font-bold">
                        {step.num}
                      </span>
                      <h2 className="text-lg font-semibold text-white">
                        {step.title}
                      </h2>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900/30 aspect-video">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 min-w-0 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {step.paragraph ? (
                      <div className="flex gap-3">
                        <span className="text-primary-orange shrink-0 mt-0.5">•</span>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                          {step.paragraph}
                        </p>
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {step.bullets.map((bullet, i) => (
                          <li key={i} className="text-gray-400 text-sm sm:text-base leading-relaxed flex gap-3">
                            <span className="text-primary-orange shrink-0 mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HowToCastPage
