import { motion } from 'framer-motion'
import { useChatStore } from '../store/chatStore'

const HistoryScreen = () => {
  const { chats, setCurrentChat, deleteChat } = useChatStore()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
          Chat History
        </h1>

        {chats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-warm-gray dark:text-warm-tan text-lg mb-2">
              No chat history yet
            </p>
            <p className="text-warm-muted dark:text-warm-gray text-sm">
              Start a new conversation to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                variants={itemVariants}
                className="group"
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setCurrentChat(chat.id)}
                  className="w-full text-left p-4 rounded-lg border border-warm-tan dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-warm-beige dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-warm-ivory flex-1 truncate">
                      {chat.title}
                    </h3>
                    <span className={`text-xs ml-2 px-2 py-1 rounded-full flex-shrink-0 ${
                      chat.mode === 'academic'
                        ? 'bg-warm-beige text-warm-gold dark:bg-gray-700 dark:text-warm-amber'
                        : 'bg-green-50 text-clinical-green dark:bg-gray-700 dark:text-clinical-green'
                    }`}>
                      {chat.mode === 'academic' ? '📚' : '⚕️'}
                    </span>
                  </div>
                  <p className="text-sm text-warm-muted dark:text-warm-gray mb-2">
                    {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-warm-gray dark:text-warm-tan">
                    {new Date(chat.updatedAt).toLocaleDateString()} at {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  onClick={() => deleteChat(chat.id)}
                  className="opacity-0 group-hover:opacity-100 mt-2 text-xs text-red-500 hover:text-red-600 transition-colors"
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default HistoryScreen
