import { useState } from 'react'
import { motion } from 'framer-motion'
import { useChatStore } from '../store/chatStore'
import HeroInput from './HeroInput'

const WelcomeScreen = () => {
  const { setShowWelcome, createChat, setSelectedMode } = useChatStore()
  const [mode, setMode] = useState<'academic' | 'clinical'>('academic')

  const handleSubmit = (message: string) => {
    if (message.trim()) {
      setSelectedMode(mode)
      const chatId = createChat(mode)
      setShowWelcome(false)
      // The message will be sent through the ChatScreen
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className="min-h-screen bg-warm-ivory dark:bg-gray-950 flex flex-col items-center justify-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-warm-gold dark:text-warm-amber mb-2">
          Nelson-GPT
        </h1>
        <p className="text-warm-gray dark:text-warm-tan text-lg">
          Pediatric Knowledge at Your Fingertips
        </p>
      </motion.div>

      {/* Hero Input Component */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-2xl"
      >
        <HeroInput
          mode={mode}
          onModeChange={setMode}
          onSubmit={handleSubmit}
        />
      </motion.div>

      {/* Suggested Prompts */}
      <motion.div
        variants={itemVariants}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl"
      >
        <SuggestionCard
          title="Fever Management"
          description="How to evaluate and manage fever in a 6-month-old infant?"
        />
        <SuggestionCard
          title="Growth Assessment"
          description="Interpreting growth charts and developmental milestones"
        />
        <SuggestionCard
          title="Vaccination"
          description="Current immunization schedules and recommendations"
        />
        <SuggestionCard
          title="Common Conditions"
          description="Evidence-based approach to acute otitis media"
        />
      </motion.div>

      {/* Footer Info */}
      <motion.p
        variants={itemVariants}
        className="mt-16 text-center text-sm text-warm-muted dark:text-warm-gray max-w-md"
      >
        Nelson-GPT provides evidence-based pediatric knowledge sourced from the Nelson Textbook of Pediatrics. Always consult with qualified healthcare professionals.
      </motion.p>
    </motion.div>
  )
}

interface SuggestionCardProps {
  title: string
  description: string
}

const SuggestionCard = ({ title, description }: SuggestionCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-4 rounded-xl border border-warm-tan dark:border-warm-gray bg-white dark:bg-gray-800 text-left hover:bg-warm-beige dark:hover:bg-gray-700 transition-colors"
    >
      <h3 className="font-semibold text-warm-gold dark:text-warm-amber mb-1">
        {title}
      </h3>
      <p className="text-sm text-warm-muted dark:text-warm-gray">
        {description}
      </p>
    </motion.button>
  )
}

export default WelcomeScreen
