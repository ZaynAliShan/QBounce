import React, { useEffect } from 'react'

const APP_STORE_URL = 'https://apps.apple.com/us/app/qbounce-pro/id6743074736'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.app.q_bounce&hl=en'

const DownloadModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal - black & orange theme */}
      <div className="relative bg-black border-2 border-primary-orange/50 rounded-2xl shadow-2xl shadow-primary-orange/25 max-w-md w-full overflow-hidden">
        {/* Orange header strip with gradient */}
        <div className="relative bg-gradient-to-r from-primary-orange to-primary-orange/90 px-8 py-5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-between">
            <h2 id="download-modal-title" className="text-xl sm:text-2xl font-bold text-black">
              Download QBounce™
            </h2>
            <button
              onClick={onClose}
              className="text-black/80 hover:text-black hover:bg-black/10 transition-colors p-1.5 rounded-lg"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body - black with orange accent line */}
        <div className="p-8 bg-black border-t border-primary-orange/30">
          <p className="text-gray-300 mb-8 leading-relaxed">
            Get the app and start improving your game with AI-powered analysis. Available on iOS and Android.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 transform hover:scale-105 hover:opacity-90 inline-flex justify-center rounded-lg ring-2 ring-transparent hover:ring-primary-orange/50 focus:outline-none focus:ring-2 focus:ring-primary-orange"
            >
              <img
                src="/images/app store.webp"
                alt="Download on the App Store"
                className="h-12 w-auto"
              />
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 transform hover:scale-105 hover:opacity-90 inline-flex justify-center rounded-lg ring-2 ring-transparent hover:ring-primary-orange/50 focus:outline-none focus:ring-2 focus:ring-primary-orange"
            >
              <img
                src="/images/google play.webp"
                alt="Get it on Google Play"
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadModal
