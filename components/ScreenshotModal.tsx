'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ScreenshotModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export function ScreenshotModal({ isOpen, onClose, title }: ScreenshotModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Screenshot: {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-gray-600 mb-2">
              Screenshot not available in this demo
            </p>
            <p className="text-sm text-gray-400">
              This is a simulation environment showcasing payment flow concepts
            </p>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}