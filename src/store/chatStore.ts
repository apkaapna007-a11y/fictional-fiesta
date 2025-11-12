import { create } from 'zustand'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  citations?: Citation[]
}

export interface Citation {
  chapter: string
  page: number
  text: string
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  mode: 'academic' | 'clinical'
  createdAt: number
  updatedAt: number
}

interface ChatState {
  chats: Chat[]
  currentChatId: string | null
  showWelcome: boolean
  selectedMode: 'academic' | 'clinical'
  
  // Chat management
  createChat: (mode: 'academic' | 'clinical') => string
  deleteChat: (chatId: string) => void
  renameChat: (chatId: string, title: string) => void
  setCurrentChat: (chatId: string) => void
  getCurrentChat: () => Chat | null
  
  // Message management
  addMessage: (chatId: string, message: Message) => void
  updateMessage: (chatId: string, messageId: string, content: string) => void
  
  // UI state
  setShowWelcome: (show: boolean) => void
  setSelectedMode: (mode: 'academic' | 'clinical') => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChatId: null,
  showWelcome: true,
  selectedMode: 'academic',
  
  createChat: (mode: 'academic' | 'clinical') => {
    const chatId = `chat-${Date.now()}`
    const newChat: Chat = {
      id: chatId,
      title: 'Untitled',
      messages: [],
      mode,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChatId: chatId,
      showWelcome: false,
    }))
    return chatId
  },
  
  deleteChat: (chatId: string) => {
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
      currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
      showWelcome: state.currentChatId === chatId,
    }))
  },
  
  renameChat: (chatId: string, title: string) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, title, updatedAt: Date.now() }
          : chat
      ),
    }))
  },
  
  setCurrentChat: (chatId: string) => {
    set({ currentChatId: chatId, showWelcome: false })
  },
  
  getCurrentChat: () => {
    const state = get()
    return state.currentChatId
      ? state.chats.find((chat) => chat.id === state.currentChatId) || null
      : null
  },
  
  addMessage: (chatId: string, message: Message) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              title: chat.messages.length === 0
                ? message.content.split('\n')[0].slice(0, 50)
                : chat.title,
              updatedAt: Date.now(),
            }
          : chat
      ),
    }))
  },
  
  updateMessage: (chatId: string, messageId: string, content: string) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId
                  ? { ...msg, content, timestamp: Date.now() }
                  : msg
              ),
              updatedAt: Date.now(),
            }
          : chat
      ),
    }))
  },
  
  setShowWelcome: (show: boolean) => {
    set({ showWelcome: show })
  },
  
  setSelectedMode: (mode: 'academic' | 'clinical') => {
    set({ selectedMode: mode })
  },
}))
