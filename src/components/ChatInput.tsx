import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { useChatStore, Message } from '../store/chatStore'

interface ChatInputProps {
  chatId: string
  mode: 'academic' | 'clinical'
}

const ChatInput = ({ chatId, mode }: ChatInputProps) => {
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { addMessage } = useChatStore()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        100
      ) + 'px'
    }
  }, [input])

  const handleSubmit = () => {
    if (input.trim()) {
      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: input,
        timestamp: Date.now(),
      }
      addMessage(chatId, userMessage)

      // Simulate assistant response with citations
      setTimeout(() => {
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-assistant`,
          role: 'assistant',
          content:
            mode === 'academic'
              ? 'Based on the Nelson Textbook of Pediatrics, here is an evidence-based explanation regarding your question...'
              : 'From a clinical perspective, I would recommend the following approach to address your concern...',
          timestamp: Date.now(),
          citations: [
            {
              chapter: '23',
              page: 1150,
              text: 'Evidence-based pediatric guidance'
            }
          ]
        }
        addMessage(chatId, assistantMessage)
      }, 800)

      setInput('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-warm-tan dark:border-gray-700 bg-white dark:bg-gray-800 sticky bottom-20"
    >
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Mode Indicator */}
        <div className="flex gap-2 mb-3">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              mode === 'academic'
                ? 'bg-warm-beige text-warm-gold dark:bg-gray-700 dark:text-warm-amber'
                : 'bg-green-50 text-clinical-green dark:bg-gray-700 dark:text-clinical-green'
            }`}
          >
            {mode === 'academic' ? '📚 Academic Mode' : '⚕️ Clinical Mode'}
          </span>
        </div>

        {/* Input Area */}
        <div className="flex gap-3 items-end">
          <div className="flex-1 bg-warm-beige dark:bg-gray-700 rounded-lg px-4 py-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up question…"
              className="w-full bg-transparent text-base resize-none outline-none placeholder-warm-gray dark:placeholder-warm-muted text-gray-900 dark:text-warm-ivory max-h-20"
              rows={1}
            />
          </div>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!input.trim()}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
              input.trim()
                ? 'bg-warm-amber hover:bg-warm-gold text-white cursor-pointer'
                : 'bg-warm-tan text-warm-muted cursor-not-allowed opacity-50'
            } dark:bg-warm-gold dark:hover:bg-warm-amber dark:text-gray-900`}
          >
            ✈️
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatInput
