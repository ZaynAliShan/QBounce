import React, { createContext, useContext, useState, useCallback } from 'react'
import DownloadModal from '../components/DownloadModal'

const DownloadModalContext = createContext(null)

export function DownloadModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openDownloadModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeDownloadModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <DownloadModalContext.Provider value={{ openDownloadModal }}>
      {children}
      <DownloadModal isOpen={isOpen} onClose={closeDownloadModal} />
    </DownloadModalContext.Provider>
  )
}

export function useDownloadModal() {
  const ctx = useContext(DownloadModalContext)
  if (!ctx) return { openDownloadModal: () => {} }
  return ctx
}
