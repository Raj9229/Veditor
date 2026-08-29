# V-Editor 📝

A **real-time collaborative code editor** built with React, Monaco Editor, and Yjs. Multiple users can edit code simultaneously with live synchronization!

## 🚀 Features

- **Real-time Collaboration**: Edit code together with multiple users simultaneously
- **Monaco Editor**: Full-featured VS Code editor experience
- **Live User Presence**: See who's currently editing
- **Dark Theme**: Eye-friendly dark UI with Tailwind CSS
- **Socket.io Integration**: WebSocket-based communication for instant updates
- **Yjs Binding**: Conflict-free replicated data type for collaborative editing

## 🏗️ Architecture

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool with HMR
- **Monaco Editor** - Code editor with syntax highlighting
- **Yjs** - Collaborative editing library
- **Socket.io Client** - Real-time communication
- **Tailwind CSS** - Styling

### Backend
- **Express.js** - HTTP server
- **Socket.io** - WebSocket server
- **Yjs Socket.io Adapter** - Synchronization layer

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## 🔧 Setup & Installation

1. **Install dependencies** (already done):
```bash
cd frontend && npm install
cd ../backend && npm install
```

2. **Start Backend Server**:
```bash
cd backend
npm run dev    # With nodemon (auto-restart)
# or
npm start      # Production mode
```
The backend will run on `http://localhost:3000`

3. **Start Frontend Dev Server** (in a new terminal):
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173` (Vite default)

## 💻 Usage

1. Open `http://localhost:5173` in your browser
2. Enter your username in the login form
3. Open multiple browser windows with different usernames to test collaboration
4. Start typing - changes sync in real-time!
5. See connected users in the top-right corner

## 📂 Project Structure

```
veditor/
├── backend/
│   ├── server.js          # Express + Socket.io server
│   ├── package.json       # Backend dependencies
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── App.jsx    # Main app component (collaborative editor)
│   │   └── main.jsx       # React entry point
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   ├── package.json       # Frontend dependencies
│   └── node_modules/
└── README.md
```

## 🔌 API Endpoints

### Backend Routes
- `GET /` - Health check endpoint
- `GET /health` - Server status
- **WebSocket** - Real-time sync via Socket.io at port 3000

## 🛠️ Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon (development)
npm start        # Start server (production)
```

## 🎨 Tech Stack Highlights

- **Yjs**: Enables conflict-free collaborative editing with built-in conflict resolution
- **Socket.io + y-socket.io**: Keeps all clients synchronized in real-time
- **Monaco Editor Binding**: Seamless integration between Monaco and Yjs
- **Awareness**: Tracks which users are connected and their positions
- **Tailwind CSS**: Modern utility-first CSS framework

## 🚀 Features Ready to Use

✅ Multi-user collaborative editing  
✅ Real-time text synchronization  
✅ User presence tracking  
✅ Dark theme UI  
✅ Monaco Editor integration  
✅ WebSocket support  
✅ Yjs CRDT support  

## 🔍 Code Quality

- ESLint configured for React best practices
- No linting errors ✓
- Syntax checked ✓

## 📝 Notes

- The project uses Yjs for conflict-free synchronization, ensuring that simultaneous edits don't cause data loss
- Users are tracked via their username and display as pills in the top-right corner
- The editor defaults to JavaScript syntax highlighting but supports all Monaco languages

## 🤝 Contributing

Feel free to extend the project with:
- Additional language support
- User colors for cursor tracking
- Code themes customization
- Persistence (database integration)
- User authentication

## 📄 License

ISC License
