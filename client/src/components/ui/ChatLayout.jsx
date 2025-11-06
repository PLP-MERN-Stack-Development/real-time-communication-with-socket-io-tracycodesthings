import { useState, useEffect } from 'react'
import { useSocket } from '../../socket/socket'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'

export default function ChatLayout() {
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentConversation, setCurrentConversation] = useState(null)
  
  const {
    isConnected,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  } = useSocket()

  const handleLogin = (name) => {
    if (name.trim()) {
      setUsername(name.trim())
      connect(name.trim())
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    disconnect()
    setIsLoggedIn(false)
    setUsername('')
    setCurrentConversation(null)
  }

  const handleSendMessage = (message) => {
    if (currentConversation) {
      sendPrivateMessage(currentConversation.id, message)
    } else {
      sendMessage(message)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Welcome to Chat
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const input = e.target.elements.username
              handleLogin(input.value)
            }}
            className="space-y-4"
          >
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        users={users}
        currentUser={username}
        currentConversation={currentConversation}
        onSelectConversation={setCurrentConversation}
        onLogout={handleLogout}
        isConnected={isConnected}
      />
      <ChatWindow
        messages={messages}
        currentUser={username}
        currentConversation={currentConversation}
        typingUsers={typingUsers}
        onSendMessage={handleSendMessage}
        onTyping={setTyping}
        isConnected={isConnected}
      />
    </div>
  )
}