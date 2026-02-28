import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const IMG = {
  femalePlayer: '/how-it-use/basketball-female-player.webp',
  playerLarge: '/how-it-use/basketball-player-large-img.webp',
  howToStart: '/how-it-use/how-to-start-img.webp',
  howToMax: '/how-it-use/how-to-max-img.webp',
}

// Shared image wrapper for consistent aspect ratio and styling
const ImageBlock = ({ src, alt, className = '' }) => (
  <div
    className={`overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/30 ${className}`}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover aspect-[4/3]"
    />
  </div>
)

function HowToUsePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Header />
      {/* Subtle page-level glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-orange/5 via-transparent to-primary-orange/5" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-primary-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[480px] h-64 bg-primary-orange/5 rounded-full blur-3xl" />
      </div>
      <main className="pt-20 relative z-0">
        {/* Hero */}
        <section className="relative py-12 lg:py-16 bg-black border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Hey </span>
              <span className="text-primary-orange">there!</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              Welcome to the QBounce Master Training App, your ticket to unlocking extraordinary
              Basketball skills and taking your training to the next level!
            </p>
          </div>
        </section>

        {/* How it works - Image left, text right */}
        <section className="relative py-12 lg:py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <ImageBlock
                  src={IMG.femalePlayer}
                  alt="Basketball player training with cones"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className="text-white">How it </span>
                  <span className="text-primary-orange">works?</span>
                </h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  QBounce offers a specialized training program for basketball players to refine
                  their skills, improve ball handling, and master essential drills. To get started,
                  select your training level based on your current abilities and aim to match the
                  precision, speed, and execution demonstrated in the program.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Unlock - Image on top, then steps */}
        <section className="relative py-12 lg:py-16 bg-black border-t border-gray-800/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="mb-8 overflow-hidden rounded-2xl aspect-[4/3] bg-black">
              <img
                src={IMG.playerLarge}
                alt="Basketball player with ball"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-white">How to Unlock New </span>
              <span className="text-primary-orange">Drills and Levels?</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
              Getting started with QBounce is simple and exciting! Follow these steps to unlock
              your personalized training experience and new drills:
            </p>
            <ol className="space-y-6">
              {[
                {
                  title: 'Create Your Unique Player Profile',
                  bullets: [
                    'Visit the QBounce website and log in using your credentials',
                    'Fill in your details, including your name, jersey number, position, and skill level.',
                    'Save your profile to personalize your training journey.',
                  ],
                },
                {
                  title: 'Purchase the QBounce Skills Mat',
                  bullets: [
                    'The QBounce Skills Mat is essential for accessing advanced drills and training',
                    'This code is your key to unlocking exclusive drills and advanced levels on the QBounce App.',
                  ],
                },
                {
                  title: 'Locate the Verification Code',
                  bullets: [
                    "Inside the package, you'll find a brochure with a unique verification code.",
                    'This code is your key to unlocking exclusive drills and advanced levels on the QBounce App.',
                  ],
                },
                {
                  title: 'Activate Your Account',
                  bullets: [
                    'Open the QBounce App and enter the verification code during setup.',
                    'This step will grant access to a variety of skill-enhancing drills tailored to your level.',
                  ],
                },
                {
                  title: 'Start Training and Level Up',
                  bullets: [
                    'Start with your current training level and complete drills to improve your stats.',
                    'Unlock higher levels as you demonstrate precision, speed and consistency.',
                    'Each level offers new challenges and techniques to help you become an elite player.',
                  ],
                },
              ].map((step, index) => (
                <li
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-primary-orange/30 transition-colors duration-200"
                >
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-orange text-black text-sm font-bold">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <ul className="space-y-2 pl-11">
                    {step.bullets.map((bullet, i) => (
                      <li key={i} className="text-gray-300 text-sm sm:text-base flex gap-2">
                        <span className="text-primary-orange shrink-0">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* How to Start - Image left, text right */}
        <section className="relative py-12 lg:py-16 bg-black border-t border-gray-800/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <ImageBlock
                  src={IMG.howToStart}
                  alt="Team huddle with basketball"
                />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className="text-white">How to </span>
                  <span className="text-primary-orange">Start?</span>
                </h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Simply complete the drills in each level, collect your rewards, and the next
                  level will automatically unlock. Keep progressing, and enjoy your training with
                  the QBounce Master Training App!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Maximize - Text left, image right */}
        <section className="relative py-12 lg:py-16 bg-black border-t border-gray-800/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className="text-white">How to Maximize </span>
                  <span className="text-primary-orange">Your Results?</span>
                </h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Maximizing your results with QBounce depends on factors such as age, skill level,
                  and dedication. Speed improvement varies for each player, but our program is
                  designed to cater to individual progress. For younger players, the Level #1
                  program focuses on developing core skills like ball control and speed. As you
                  advance, you'll continue to refine these skills, enhancing both speed and
                  accuracy. Consistent practice and dedication to your training will help you
                  achieve your full potential.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={IMG.howToMax}
                    alt="Coach with basketball players"
                    className="w-full h-auto object-contain max-h-[420px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why QBounce Master Training - Text left, single image right */}
        <section className="relative py-12 lg:py-16 bg-black border-t border-gray-800/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className="text-white">Why QBounce </span>
                  <span className="text-primary-orange">Master Training?</span>
                </h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  QBounce Master Training focuses on developing technical skills and spatial
                  awareness, which are vital for basketball success. Our drills help players
                  visualize ball movements and anticipate the actions of teammates and opponents,
                  improving decision-making and on-court effectiveness. This training enhances
                  abilities like making precise passes, accurate shots, and quick reactions in
                  game situations.
                </p>
              </div>
              <div>
                <ImageBlock
                  src={IMG.femalePlayer}
                  alt="Basketball player training with cones"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HowToUsePage
