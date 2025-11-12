import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-40 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-3 text-center"
        >
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            📶 You are offline - Nelson-GPT will work with cached data
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OfflineIndicator
