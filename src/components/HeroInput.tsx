import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroInputProps {
  mode: 'academic' | 'clinical'
  onModeChange: (mode: 'academic' | 'clinical') => void
  onSubmit: (message: string) => void
}

const HeroInput = ({ mode, onModeChange, onSubmit }: HeroInputProps) => {
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        120
      ) + 'px'
    }
  }, [input])

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input)
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
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Hero Input Container */}
      <motion.div
        animate={{
          boxShadow: isFocused
            ? '0 12px 40px rgba(212, 165, 116, 0.2)'
            : '0 4px 20px rgba(212, 165, 116, 0.12)',
        }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8"
      >
        {/* Mode Toggle */}
        <div className="flex gap-3 mb-6">
          <ModeButton
            label="Academic"
            isActive={mode === 'academic'}
            onClick={() => onModeChange('academic')}
            color="amber"
          />
          <ModeButton
            label="Clinical"
            isActive={mode === 'clinical'}
            onClick={() => onModeChange('clinical')}
            color="green"
          />
        </div>

        {/* Mode Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs md:text-sm text-warm-muted dark:text-warm-gray mb-4"
          >
            {mode === 'academic'
              ? '📚 Get detailed, textbook-style explanations with evidence'
              : '⚕️ Get practical clinical approaches and diagnostic reasoning'}
          </motion.p>
        </AnimatePresence>

        {/* Input Area */}
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Nelson-GPT anything…"
              className="w-full bg-transparent text-base md:text-lg resize-none outline-none placeholder-warm-gray dark:placeholder-warm-muted text-gray-900 dark:text-warm-ivory max-h-32"
              rows={1}
            />
          </div>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!input.trim()}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
              input.trim()
                ? 'bg-warm-amber hover:bg-warm-gold text-white cursor-pointer'
                : 'bg-warm-tan text-warm-muted cursor-not-allowed opacity-50'
            } dark:bg-warm-gold dark:hover:bg-warm-amber dark:text-gray-900`}
          >
            ✈️
          </motion.button>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-warm-muted dark:text-warm-gray mt-4">
          Press Ctrl+Enter to send or click the plane icon
        </p>
      </motion.div>
    </motion.div>
  )
}

interface ModeButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
  color: 'amber' | 'green'
}

const ModeButton = ({ label, isActive, onClick, color }: ModeButtonProps) => {
  const bgColor = color === 'amber' ? 'warm-amber' : 'clinical-green'
  const borderColor = color === 'amber' ? 'warm-gold' : 'clinical-green'

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: isActive ? `var(--color-${bgColor})` : 'transparent',
        borderColor: `var(--color-${borderColor})`,
      }}
      transition={{ duration: 0.2 }}
      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
        isActive
          ? 'text-white'
          : 'dark:text-warm-amber'
      }`}
      style={{
        backgroundColor: isActive
          ? color === 'amber'
            ? '#D4A574'
            : '#6B9E7F'
          : 'transparent',
        borderColor: color === 'amber' ? '#B8860B' : '#6B9E7F',
        color: isActive ? 'white' : color === 'amber' ? '#B8860B' : '#6B9E7F',
      }}
    >
      {label}
    </motion.button>
  )
}

export default HeroInput
