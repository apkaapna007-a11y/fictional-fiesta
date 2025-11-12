import { motion } from 'framer-motion'
import { useChatStore } from '../store/chatStore'

const BottomTabNavigation = () => {
  const { currentScreen, setCurrentScreen, darkMode, setDarkMode } = useChatStore()

  const tabs = [
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'history', label: 'History', icon: '🕘' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ] as const

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 border-t border-warm-tan dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <div className="max-w-4xl mx-auto px-2 py-3 flex items-center justify-between">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center py-2 rounded-lg transition-all relative"
          >
            {currentScreen === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-warm-amber rounded-full"
                transition={{ duration: 0.3 }}
              />
            )}
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className={`text-xs font-medium ${
              currentScreen === tab.id
                ? 'text-warm-gold dark:text-warm-amber'
                : 'text-warm-muted dark:text-warm-gray'
            }`}>
              {tab.label}
            </span>
          </motion.button>
        ))}

        {/* Dark Mode Toggle */}
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-2 px-3 py-2 rounded-lg bg-warm-beige dark:bg-gray-700 text-warm-gray dark:text-warm-tan hover:bg-warm-tan dark:hover:bg-gray-600 transition-colors"
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </motion.button>
      </div>
    </motion.nav>
  )
}

export default BottomTabNavigation
