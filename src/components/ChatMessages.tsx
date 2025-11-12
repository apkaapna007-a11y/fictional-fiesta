import { motion } from 'framer-motion'
import { Chat, useChatStore, Message } from '../store/chatStore'
import CitationBadge from './CitationBadge'
import FollowUpSuggestions from './FollowUpSuggestions'

interface ChatMessagesProps {
  chat: Chat
}

const ChatMessages = ({ chat }: ChatMessagesProps) => {
  const { addMessage } = useChatStore()

  const handleFollowUpClick = (suggestion: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: suggestion,
      timestamp: Date.now(),
    }
    addMessage(chat.id, userMessage)

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: `Based on your question about "${suggestion}", here's what the evidence shows...`,
        timestamp: Date.now(),
        citations: [
          {
            chapter: '25',
            page: 1245,
            text: 'Relevant pediatric information'
          }
        ]
      }
      addMessage(chat.id, assistantMessage)
    }, 800)
  }

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
                <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                {message.citations && message.citations.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {message.citations.map((citation) => (
                      <div key={`${citation.chapter}-${citation.page}`}>
                        <CitationBadge citation={citation} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {chat.messages.length > 0 && chat.messages[chat.messages.length - 1].role === 'assistant' && (
            <FollowUpSuggestions onSuggestionClick={handleFollowUpClick} />
          )}
        </div>
      )}
    </motion.div>
  )
}

export default ChatMessages
