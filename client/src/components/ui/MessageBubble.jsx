export default function MessageBubble({ message, isOwn }) {
  if (message.system) {
    return (
      <div className="flex justify-center">
        <div className="rounded-full bg-gray-300 px-4 py-1 text-sm text-gray-700">
          {message.message}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-md rounded-lg px-4 py-2 ${
          isOwn
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-800 shadow'
        }`}
      >
        {!isOwn && (
          <div className="mb-1 text-xs font-semibold opacity-75">
            {message.from}
          </div>
        )}
        <div className="break-words">{message.message}</div>
        <div
          className={`mt-1 text-xs ${
            isOwn ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  )
}