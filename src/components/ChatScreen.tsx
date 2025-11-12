import { motion } from 'framer-motion'
import { useChatStore } from '../store/chatStore'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

const ChatScreen = () => {
  const currentChat = useChatStore((state) => state.getCurrentChat())

  if (!currentChat) {
    return (
      <div className="min-h-screen bg-warm-ivory dark:bg-gray-950 flex items-center justify-center">
        <p className="text-warm-gray">Loading chat...</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-warm-ivory dark:bg-gray-950 flex flex-col"
    >
      {/* Header */}
      <ChatHeader chat={currentChat} />

      {/* Messages */}
      <ChatMessages chat={currentChat} />

      {/* Input Dock */}
      <ChatInput chatId={currentChat.id} mode={currentChat.mode} />
    </motion.div>
  )
}

export default ChatScreen
