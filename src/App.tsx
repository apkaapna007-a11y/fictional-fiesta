import { useState, useEffect } from 'react'
import { useChatStore } from './store/chatStore'
import SplashScreen from './components/SplashScreen'
import WelcomeScreen from './components/WelcomeScreen'
import ChatScreen from './components/ChatScreen'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const showWelcome = useChatStore((state) => state.showWelcome)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <div className="min-h-screen bg-warm-ivory dark:bg-gray-950">
      {showWelcome ? <WelcomeScreen /> : <ChatScreen />}
    </div>
  )
}
