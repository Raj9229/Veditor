import './App.css'
import {Editor}  from "@monaco-editor/react"
import {MonacoBinding} from "y-monaco"
import {useEffect, useRef, useState } from "react"
import * as Y from "yjs"
import {SocketIOProvider} from "y-socket.io"



function App() {
  const editorRef = useRef(null)
  const providerRef = useRef(null)
  const bindingRef = useRef(null)
  const [username , setusername] = useState(()=>{
    return new URLSearchParams(window.location.search).get("username") || ""  
  })

  const ydocRef = useRef(new Y.Doc())
  const ytextRef = useRef(null)
  const [users, setusers] = useState([])

  const handleMount = (editor)=>{
    editorRef.current = editor
    if (!ytextRef.current) {
      ytextRef.current = ydocRef.current.getText("monaco")
    }
  }

  const handleJoin = (e) => {
    e.preventDefault()
    const newUsername = e.target.username.value
    setusername(newUsername)
    window.history.pushState({}, "", `?username=${newUsername}`)
  }

  useEffect(()=>{
    if(username && editorRef.current && ytextRef.current){
      console.log("[Veditor] Setting up provider for user:", username)
      
      // Destroy previous provider if exists
      if(providerRef.current){
        console.log("[Veditor] Destroying previous provider")
        providerRef.current.disconnect()
        providerRef.current.destroy()
        if(bindingRef.current){
          bindingRef.current.destroy()
        }
      }

      // Create new provider
      providerRef.current = new SocketIOProvider("http://localhost:3000", "monaco-demo", ydocRef.current, {autoconnect: true})
      console.log("[Veditor] Provider created")
      
      // Set user awareness immediately
      providerRef.current.awareness.setLocalStateField("user", {username, color: Math.floor(Math.random()*16777215).toString(16)})
      console.log("[Veditor] Awareness set for user:", username)
      
      // Update users list when awareness changes
      const updateUsers = () => {
        const states = Array.from(providerRef.current.awareness.getStates().values())
        const connectedUsers = states
          .map(state => state.user?.username)
          .filter(Boolean)
        console.log("[Veditor] Connected users updated:", connectedUsers)
        setusers(connectedUsers)
      }
      
      providerRef.current.awareness.on("change", updateUsers)
      
      // Wait for sync and create binding
      const onSync = (event) => {
        console.log("[Veditor] Sync event:", event.synced)
        if(event.synced){
          console.log("[Veditor] Document synced, creating Monaco binding")
          if(bindingRef.current) {
            bindingRef.current.destroy()
          }
          bindingRef.current = new MonacoBinding(
            ytextRef.current,
            editorRef.current.getModel(),
            new Set([editorRef.current]), 
            providerRef.current.awareness
          )
          console.log("[Veditor] Monaco binding created successfully")
          // Remove this listener after binding created
          providerRef.current.off("sync", onSync)
        }
      }
      
      providerRef.current.on("sync", onSync)
      
      // Also handle awareness update on initial load
      updateUsers()
      
      // Connection event listeners
      providerRef.current.on("status", (event) => {
        console.log("[Veditor] Connection status:", event.status)
      })
      
      return () => {
        console.log("[Veditor] Cleaning up effect")
        if(providerRef.current) {
          providerRef.current.awareness.off("change", updateUsers)
          providerRef.current.off("sync", onSync)
        }
      }
    } else {
      console.log("[Veditor] Waiting for username, editor, or text. username:", !!username, "editor:", !!editorRef.current, "text:", !!ytextRef.current)
    }
  }, [username])

  if(!username){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-6">V-Editor</h1>
          <p className="text-gray-300 mb-4">Collaborative Code Editor</p>
          <form onSubmit={handleJoin} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">V-Editor</h1>
          <p className="text-sm text-gray-400">Logged in as: <span className="text-blue-400 font-semibold">{username}</span></p>
        </div>
        <div className="text-gray-300">
          <p className="text-sm">Connected Users ({users.length}):</p>
          <div className="flex gap-2 mt-2">
            {users.map((user, idx) => (
              <span key={idx} className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                {user}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// Start coding collaboratively!\n"
          onMount={handleMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "Fira Code, monospace"
          }}
        />
      </div>
    </div>
  )
}

export default App
