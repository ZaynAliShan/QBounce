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
  loginPage: '/how-to-cast/login-page.webp',
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
      'Make sure you are using the Google Chrome browser on your PC. If you haven\'t installed it yet, download and install it from the official Google Chrome website.',
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
    title: 'Enjoy Using the Qbounce Web App on Your TV',
    image: IMG.loginPage,
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Header />
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-orange/5 via-transparent to-primary-orange/5" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-primary-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[480px] h-64 bg-primary-orange/5 rounded-full blur-3xl" />
      </div>
      <main className="pt-20 relative z-0">
        <section className="relative py-12 lg:py-16 bg-black border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide">
              <span className="text-white">How To Cast </span>
              <span className="text-primary-orange">Our App to Your Device</span>
            </h1>
          </div>
        </section>

        <section className="relative py-12 lg:py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12">
            {STEPS.map((step, index) => (
              <div
                key={step.num}
                className="relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-primary-orange/30 transition-colors duration-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-orange text-black text-lg font-bold -mt-14 sm:-mt-16 mb-4 border-4 border-black">
                  {step.num}
                </div>
                <div
                  className={`grid grid-cols-1 gap-6 ${
                    index % 2 === 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/30 aspect-video min-h-[180px]">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    {step.paragraph ? (
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {step.paragraph}
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {step.bullets.map((bullet, i) => (
                          <li key={i} className="text-gray-300 text-sm sm:text-base flex gap-2">
                            <span className="text-primary-orange shrink-0">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HowToCastPage
