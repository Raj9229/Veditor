import './App.css'
import {Editor}  from "@monaco-editor/react"
import {MonacoBinding} from "y-monaco"
import {useEffect, useRef, useMemo } from "react"
import * as Y from "yjs"
import {SocketIOProvider} from "y-socket.io"





function App() {
  const editorRef = useRef(null)

  const ydoc = useMemo(()=> new Y.Doc(), [])
  const ytext = useMemo(()=> ydoc.getText("monaco"), [ydoc])



  const handleMount = (editor)=>{
    editorRef.current = editor

    const provider = new SocketIOProvider("http://localhost:3000", "monaco-demo", ydoc, {autocorrect: true})
    const monacoBinding = new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editorRef.current]), 
      provider.awareness)



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
