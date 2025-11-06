import { useState, useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

export default function ChatWindow({
  messages,
  currentUser,
  currentConversation,
  typingUsers,
  onSendMessage,
  onTyping,
  isConnected,
}) {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInputChange = (e) => {
    setInputMessage(e.target.value)

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set typing to true
    onTyping(true)

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false)
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputMessage.trim() && isConnected) {
      onSendMessage(inputMessage.trim())
      setInputMessage('')
      onTyping(false)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }

  const filteredMessages = currentConversation
    ? messages.filter(
        (msg) =>
          (msg.from === currentUser && msg.to === currentConversation.username) ||
          (msg.from === currentConversation.username && msg.to === currentUser)
      )
    : messages.filter((msg) => !msg.to || msg.system)

  return (
    <div className="flex flex-1 flex-col">
      {/* Chat Header */}
      <div className="border-b border-gray-300 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentConversation
            ? currentConversation.username
            : 'Global Chat'}
        </h2>
        <p className="text-sm text-gray-600">
          {currentConversation
            ? 'Private conversation'
            : 'Everyone can see these messages'}
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="space-y-4">
          {filteredMessages.map((message, index) => (
            <MessageBubble
              key={message.id || index}
              message={message}
              isOwn={message.from === currentUser}
            />
          ))}
          {typingUsers.length > 0 && (
            <div className="text-sm italic text-gray-500">
              {typingUsers.join(', ')}{' '}
              {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-300 bg-white p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder={
              isConnected
                ? 'Type a message...'
                : 'Connecting...'
            }
            disabled={!isConnected}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!isConnected || !inputMessage.trim()}
            className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}