import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Citation } from '../store/chatStore'

interface CitationBadgeProps {
  citation: Citation
}

const CitationBadge = ({ citation }: CitationBadgeProps) => {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        onClick={() => setShowPreview(!showPreview)}
        className="inline-flex items-center gap-1 px-2 py-1 mx-1 rounded-full border border-warm-amber bg-warm-ivory hover:bg-warm-beige dark:bg-gray-700 dark:border-warm-gold text-warm-gold dark:text-warm-amber text-xs font-medium transition-colors"
      >
        <span>[Nelson</span>
        <span>Ch. {citation.chapter}</span>
        <span>p. {citation.page}]</span>
      </motion.button>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-white dark:bg-gray-800 border border-warm-tan dark:border-gray-600 rounded-lg shadow-warm-lg p-3 max-w-xs">
              <p className="text-xs font-semibold text-warm-gold dark:text-warm-amber mb-1">
                Nelson Textbook of Pediatrics
              </p>
              <p className="text-xs text-gray-700 dark:text-warm-tan">
                Chapter {citation.chapter}, Page {citation.page}
              </p>
              {citation.text && (
                <p className="text-xs text-warm-muted dark:text-warm-gray mt-2 italic">
                  "{citation.text}"
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CitationBadge
