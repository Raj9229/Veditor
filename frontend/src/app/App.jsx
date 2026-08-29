import './App.css'
import {Editor}  from "@monaco-editor/react"
import {MonacoBinding} from "y-monaco"
import {useEffect, useRef, useMemo, useState } from "react"
import * as Y from "yjs"
import {SocketIOProvider} from "y-socket.io"





function App() {
  const editorRef = useRef(null)
  const [usernsme , setusername] = useState(()=>{
    return new URLSearchParams(window.location.search).get("username") || ""  
  })

  const ydoc = useMemo(()=> new Y.Doc(), [])
  const ytext = useMemo(()=> ydoc.getText("monaco"), [ydoc])
  const [users, setusers] = useState([])


  const handleMount = (editor)=>{
    editorRef.current = editor

    

}

const handleJoin = (e) => {
  e.preventDefault()
  setusername(e.target.username.value)
  window.history.pushState({}, "", `?username=${e.target.username.value}`)

}

useEffect(()=>{
  if(usernsme && editorRef.current){
    const provider = new SocketIOProvider("http://localhost:3000", "monaco-demo", ydoc, {autocorrect: true})
    provider.awareness.setLocalStateField("user", {username})
    provider.awareness.on("change", ()=>{})
    const monacoBinding = new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editorRef.current]), 
      provider.awareness)

  }
}, [editorRef.current,usernsme])




if(!usernsme){
  return (
    <main className="w-full h-screen bg-gray-900 flex gap-4 p-4">
      <form onSubmit={handleJoin} className="w-full h-full flex flex-col justify-center items-center gap-4">
        
        <input 
        type="text"
        placeholder="Enter your username" 
        className="p-2 rounded-lg text-black"
        name="username"
        />

        <button
        className="bg-blue-500 text-white p-2 rounded-lg"
        >Join</button>
      </form>
    </main>
  )
}


  return (

    <main className="w-full h-screen bg-gray-900 flex gap-4 p-4">

      <aside className="h-full w-1/4 bg-amber-50 rounded-lg">
      </aside>

      <section className="w-3/4 bg-neutral-800 rounded-lg">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        theme="vs-dark"
        onMount={handleMount}
      />
      </section>




    </main>

    

  )
}

export default App
