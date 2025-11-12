import { motion } from 'framer-motion'
import { useChatStore } from '../store/chatStore'

const ProfileScreen = () => {
  const { chats } = useChatStore()

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

  const totalMessages = chats.reduce((sum, chat) => sum + chat.messages.length, 0)
  const academicChats = chats.filter(chat => chat.mode === 'academic').length
  const clinicalChats = chats.filter(chat => chat.mode === 'clinical').length

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 overflow-y-auto pb-24 px-4 py-8"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-warm-gold dark:text-warm-amber mb-8">
          Profile
        </h1>

        {/* User Avatar */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-warm-amber to-warm-gold mb-4">
            <span className="text-5xl font-bold text-white">N</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-warm-ivory">
            Nelson-GPT User
          </h2>
          <p className="text-warm-muted dark:text-warm-gray mt-1">
            Pediatric Knowledge Assistant
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-warm-tan dark:border-gray-700 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-warm-amber">{chats.length}</p>
            <p className="text-xs text-warm-muted dark:text-warm-gray mt-2">
              Total Chats
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-warm-tan dark:border-gray-700 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-warm-amber">{totalMessages}</p>
            <p className="text-xs text-warm-muted dark:text-warm-gray mt-2">
              Total Messages
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-warm-tan dark:border-gray-700 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-clinical-green">{Math.round((academicChats / Math.max(chats.length, 1)) * 100)}%</p>
            <p className="text-xs text-warm-muted dark:text-warm-gray mt-2">
              Academic
            </p>
          </div>
        </motion.div>

        {/* Activity Summary */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-warm-ivory">
            Activity Summary
          </h3>

          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800 border border-warm-tan dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-warm-muted dark:text-warm-gray">Academic Mode</span>
                <span className="font-medium text-gray-900 dark:text-warm-ivory">{academicChats} chats</span>
              </div>
              <div className="w-full bg-warm-beige dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-warm-amber h-2 rounded-full transition-all"
                  style={{
                    width: chats.length > 0 ? `${(academicChats / chats.length) * 100}%` : '0%'
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-warm-tan dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-warm-muted dark:text-warm-gray">Clinical Mode</span>
                <span className="font-medium text-gray-900 dark:text-warm-ivory">{clinicalChats} chats</span>
              </div>
              <div className="w-full bg-green-50 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-clinical-green h-2 rounded-full transition-all"
                  style={{
                    width: chats.length > 0 ? `${(clinicalChats / chats.length) * 100}%` : '0%'
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡 <span className="font-medium">Tip:</span> Your data is stored locally on this device. Clearing your browser data will remove all saved conversations.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProfileScreen
