import { motion } from 'framer-motion'
import { Chat } from '../store/chatStore'

interface ChatMessagesProps {
  chat: Chat
}

const ChatMessages = ({ chat }: ChatMessagesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-8"
    >
      {chat.messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-warm-gray dark:text-warm-tan text-lg">
              Ask Nelson-GPT your pediatric questions
            </p>
            <p className="text-warm-muted dark:text-warm-gray text-sm mt-2">
              Mode: {chat.mode === 'academic' ? '📚 Academic' : '⚕️ Clinical'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {chat.messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-warm-beige dark:bg-gray-700 text-gray-900 dark:text-warm-ivory'
                    : 'bg-white dark:bg-gray-700 border border-warm-tan dark:border-gray-600 text-gray-900 dark:text-warm-ivory'
                }`}
              >
                <p className="text-sm md:text-base">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default ChatMessages
