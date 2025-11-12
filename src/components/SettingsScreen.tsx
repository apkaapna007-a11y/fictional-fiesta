import { motion } from 'framer-motion'
import { useChatStore } from '../store/chatStore'

const SettingsScreen = () => {
  const { darkMode, setDarkMode } = useChatStore()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 overflow-y-auto pb-24 px-4 py-8"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-warm-gold dark:text-warm-amber mb-8">
          Settings
        </h1>

        <div className="space-y-6">
          {/* Appearance Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-warm-ivory">
              Appearance
            </h2>

            <div className="bg-white dark:bg-gray-800 border border-warm-tan dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-warm-ivory">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-warm-muted dark:text-warm-gray mt-1">
                    {darkMode ? 'Currently enabled' : 'Currently disabled'}
                  </p>
                </div>

                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    darkMode
                      ? 'bg-warm-amber'
                      : 'bg-warm-tan'
                  }`}
                >
                  <motion.div
                    layout
                    className="h-6 w-6 rounded-full bg-white shadow-lg"
                    animate={{
                      x: darkMode ? 28 : 4,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Privacy Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-warm-ivory">
              Privacy
            </h2>

            <div className="bg-white dark:bg-gray-800 border border-warm-tan dark:border-gray-700 rounded-lg p-4 space-y-3">
              <p className="text-sm text-warm-gray dark:text-warm-tan">
                Nelson-GPT respects your privacy. All conversations are stored locally on your device and never sent to external servers without your consent.
              </p>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-warm-ivory">
              About
            </h2>

            <div className="bg-white dark:bg-gray-800 border border-warm-tan dark:border-gray-700 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-warm-muted dark:text-warm-gray">Version</span>
                <span className="font-medium text-gray-900 dark:text-warm-ivory">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-muted dark:text-warm-gray">Built with</span>
                <span className="font-medium text-gray-900 dark:text-warm-ivory">React + Vite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-muted dark:text-warm-gray">Database</span>
                <span className="font-medium text-gray-900 dark:text-warm-ivory">Local Storage</span>
              </div>
            </div>
          </motion.div>

          {/* Cache Management */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-warm-ivory">
              Storage
            </h2>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (confirm('Are you sure you want to clear all cached data?')) {
                  localStorage.clear()
                  window.location.reload()
                }
              }}
              className="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              Clear All Data
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default SettingsScreen
