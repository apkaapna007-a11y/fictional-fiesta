import { motion } from 'framer-motion'
import { useChatStore } from '../store/chatStore'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import HistoryScreen from './HistoryScreen'
import SettingsScreen from './SettingsScreen'
import ProfileScreen from './ProfileScreen'
import BottomTabNavigation from './BottomTabNavigation'

const ChatScreenMain = () => {
  const { currentScreen, darkMode } = useChatStore()
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

const ChatScreen = () => {
  const { currentScreen } = useChatStore()

  return (
    <div className="min-h-screen bg-warm-ivory dark:bg-gray-950 flex flex-col">
      {currentScreen === 'chat' && <ChatScreenMain />}
      {currentScreen === 'history' && <HistoryScreen />}
      {currentScreen === 'settings' && <SettingsScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}

      <BottomTabNavigation />
    </div>
  )
}

export default ChatScreen
