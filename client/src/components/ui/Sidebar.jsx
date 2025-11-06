export default function Sidebar({
  users,
  currentUser,
  currentConversation,
  onSelectConversation,
  onLogout,
  isConnected,
}) {
  return (
    <div className="w-80 border-r border-gray-300 bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">{currentUser}</h2>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  isConnected ? 'bg-green-400' : 'bg-red-400'
                }`}
              />
              <span className="text-sm text-white opacity-90">
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="rounded bg-white bg-opacity-20 px-3 py-1 text-sm text-white transition hover:bg-opacity-30"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto">
        <div className="p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-600">
            ONLINE USERS ({users.length})
          </h3>
          <div className="space-y-1">
            {/* Global Chat */}
            <button
              onClick={() => onSelectConversation(null)}
              className={`w-full rounded-lg p-3 text-left transition ${
                !currentConversation
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                  #
                </div>
                <div>
                  <div className="font-semibold">Global Chat</div>
                  <div className="text-sm opacity-75">Everyone</div>
                </div>
              </div>
            </button>

            {/* Individual Users */}
            {users
              .filter((user) => user.username !== currentUser)
              .map((user) => (
                <button
                  key={user.id}
                  onClick={() => onSelectConversation(user)}
                  className={`w-full rounded-lg p-3 text-left transition ${
                    currentConversation?.id === user.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500 font-semibold text-white">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold">{user.username}</div>
                      <div className="text-sm opacity-75">Online</div>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}