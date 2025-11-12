import { motion } from 'framer-motion'
import { Chat, useChatStore } from '../store/chatStore'

interface ChatHeaderProps {
  chat: Chat
}

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const { setShowWelcome } = useChatStore()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-warm-tan dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowWelcome(true)}
          className="text-warm-gold dark:text-warm-amber hover:text-warm-muted transition-colors"
        >
          ← Back
        </motion.button>

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-warm-ivory flex-1 text-center px-4">
          {chat.title}
        </h1>

        {/* Menu */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-warm-gold dark:text-warm-amber hover:text-warm-muted transition-colors"
        >
          ⋮
        </motion.button>
      </div>
    </motion.header>
  )
}

export default ChatHeader
