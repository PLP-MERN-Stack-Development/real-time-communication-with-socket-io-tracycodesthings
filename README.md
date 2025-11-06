# Real-Time Chat Application with Socket.io

A full-stack real-time chat application built with React, Node.js, Express, Socket.io, and MongoDB.

## Features

- 🔐 User authentication with username
- 💬 Real-time messaging
- 👥 Global chat room
- 🔒 Private messaging between users
- ✍️ Typing indicators
- 👀 Online user list
- 📱 Responsive design with Tailwind CSS
- 🔄 Auto-reconnection

- ## Screenshots

### Login Screen
![Login Screen](./screenshots/login-screen.png)

### Chat Interface
![Chat Interface](./screenshots/chat-interface.png)

### Private Messaging
![Private Messaging](./screenshots/private-chat.png)




## Tech Stack

### Frontend
- React 18
- Socket.io Client
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- Socket.io
- MongoDB with Mongoose
- dotenv for environment variables

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── ui/        # UI components (ChatLayout, Sidebar, ChatWindow, MessageBubble)
│   │   ├── pages/         # Page components (Dashboard)
│   │   ├── socket/        # Socket.io client setup
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
│
└── server/                # Node.js backend
    ├── src/
    │   ├── config/        # Database configuration
    │   ├── controllers/   # Request handlers
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   ├── utils/         # Utility functions
    │   └── server.js      # Main server file
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-time-communication-with-socket-io-tracycodesthings
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/socket-chat
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/socket-chat
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

### Running the Application

1. **Start the server** (from the `server` directory)
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

2. **Start the client** (from the `client` directory)
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

1. **Enter a username** to join the chat
2. **Send messages** in the global chat room (visible to all users)
3. **Click on a user** in the sidebar to start a private conversation
4. **See typing indicators** when other users are typing
5. **View online users** in the sidebar

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Messages
- `GET /api/messages/:conversationId` - Get messages for a conversation
- `POST /api/messages` - Create new message
- `PUT /api/messages/:id/read` - Mark message as read
- `DELETE /api/messages/:id` - Delete message

### Conversations
- `GET /api/conversations/:userId` - Get user's conversations
- `GET /api/conversations/detail/:id` - Get conversation by ID
- `POST /api/conversations` - Create new conversation
- `PUT /api/conversations/:id` - Update conversation
- `DELETE /api/conversations/:id` - Delete conversation

## Socket.io Events

### Client to Server
- `user_join` - User joins the chat
- `send_message` - Send a message to global chat
- `private_message` - Send a private message
- `typing` - User typing status

### Server to Client
- `connect` - Socket connection established
- `disconnect` - Socket disconnected
- `receive_message` - Receive a new message
- `private_message` - Receive a private message
- `user_list` - Updated list of online users
- `user_joined` - New user joined
- `user_left` - User left
- `typing_users` - Updated list of typing users

## Scripts

### Server
- `npm start` - Start the server
- `npm run dev` - Start server with nodemon (auto-reload)

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is part of the PLP MERN Stack Development course.

## Acknowledgments

- Socket.io documentation
- React documentation
- Tailwind CSS
- MongoDB documentation
