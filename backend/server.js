import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"
import {YSocketIO} from "y-socket.io/dist/server"


const app = express()
const httpServer = createServer(app)


const io = new Server(httpServer,{
    cors:{
        origin : "*",
        methods :["GET" ,"POST"]
    }
})

// Log Socket.io connections
io.on("connection", (socket) => {
    console.log("[Server] Client connected:", socket.id)
    
    socket.on("disconnect", (reason) => {
        console.log("[Server] Client disconnected:", socket.id, "Reason:", reason)
    })
    
    socket.on("error", (error) => {
        console.log("[Server] Socket error:", error)
    })
})

const ySocketIo = new YSocketIO(io)
ySocketIo.initialize()

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World", success:true })
})

app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok", success:true })
})

httpServer.listen(3000, () => {
    console.log("[Server] ✓ Server is running on http://localhost:3000")
    console.log("[Server] ✓ Socket.io ready for collaborative editing")
})