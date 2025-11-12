import { useState, useEffect } from 'react'
import { useChatStore } from './store/chatStore'
import SplashScreen from './components/SplashScreen'
import WelcomeScreen from './components/WelcomeScreen'
import ChatScreen from './components/ChatScreen'
import InstallPrompt from './components/InstallPrompt'
import OfflineIndicator from './components/OfflineIndicator'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const showWelcome = useChatStore((state) => state.showWelcome)
  const darkMode = useChatStore((state) => state.darkMode)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <div className="min-h-screen bg-warm-ivory dark:bg-gray-950">
      <OfflineIndicator />
      {showWelcome ? <WelcomeScreen /> : <ChatScreen />}
      <InstallPrompt />
    </div>
  )
}
