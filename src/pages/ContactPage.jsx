import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CONTACT_EMAIL = 'info@quietbounce.com'

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Placeholder - replace with actual API call when backend is ready
    setTimeout(() => {
      setStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', message: '' })
    }, 800)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-20">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-2xl">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide mb-4">
              Contact Us
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              If you have any questions, you can contact us using our contact details or via the contact form.
            </p>
          </header>

          {/* Email display */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-lg bg-gray-900 border border-gray-800 text-white hover:border-primary-orange/50 transition-colors duration-200 mb-10"
          >
            <svg
              className="w-5 h-5 shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>{CONTACT_EMAIL}</span>
          </a>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-white mb-2">
                  Your First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your First Name"
                  className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange transition"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-white mb-2">
                  Your Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your Last Name"
                  className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                Your Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email Address"
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange transition"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange transition resize-none"
              />
            </div>

            {status === 'success' && (
              <p className="text-green-400 text-sm font-medium">
                Thank you! Your message has been sent. We&apos;ll get back to you soon.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-lg bg-primary-orange text-black px-6 py-3 font-semibold hover:bg-primary-orange/90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 focus:ring-offset-zinc-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
          </form>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage
