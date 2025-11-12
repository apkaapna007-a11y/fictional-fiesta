import { motion } from 'framer-motion'

interface FollowUpSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

const FollowUpSuggestions = ({ onSuggestionClick }: FollowUpSuggestionsProps) => {
  const suggestions = [
    'Can you explain more?',
    'What are the complications?',
    'How is this managed?',
    'What are the risk factors?',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-6 px-4 py-6 border-t border-warm-tan dark:border-gray-700 bg-warm-ivory/50 dark:bg-gray-900/30"
    >
      <p className="text-xs md:text-sm font-medium text-warm-muted dark:text-warm-gray mb-4">
        💡 Follow-up suggestions:
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-3 py-2 rounded-full border border-warm-amber text-warm-gold dark:text-warm-amber bg-white dark:bg-gray-800 hover:bg-warm-beige dark:hover:bg-gray-700 text-xs md:text-sm font-medium transition-colors"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default FollowUpSuggestions
