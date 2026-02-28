import React, { useState, useEffect } from 'react'

const TOAST_DURATION_MS = 4000

export default function ToastListener() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const handler = (e) => setToast(e.detail?.message ?? null)
    window.addEventListener('qbounce-toast', handler)
    return () => window.removeEventListener('qbounce-toast', handler)
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), TOAST_DURATION_MS)
    return () => clearTimeout(t)
  }, [toast])

  if (!toast) return null

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-lg bg-green-600 text-white text-sm font-medium shadow-lg"
      role="status"
      aria-live="polite"
    >
      {toast}
    </div>
  )
}
