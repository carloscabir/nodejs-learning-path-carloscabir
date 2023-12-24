import 'dotenv/config'
import express from "express"
import logger from "morgan"
import mongoose from "mongoose";

import { Server } from "socket.io"
import { createServer } from "node:http"


const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {
    // NO, costoso al servidor === mucha informacion por entregar
    maxDisconnectionDuration: Infinity
  }
})

 mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(m => { 
    console.log(`Connected to ${m.connection.name} database`); 
    return m.connection.getClient();
  })
  .catch(err => err)

const messageSchema = new mongoose.Schema({
  message: {type: String, required: true},
  author: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
})

const MessageModel = mongoose.model("Message", messageSchema);

io.on("connection", async (socket) => { 
  console.log("New client connected")

  socket.on("disconnect", () => { 
    console.log("Client disconnected")
  })

  socket.on("chat message", async (msg) => { 
    let res;
    const username = socket.handshake.auth.username || "Anonymous"

    try {
      let message = new MessageModel(
        {
          message: msg,
          author: username
        })
      
    res = await message.save()
          .then(doc => doc)
          .catch(err => new Error(err))
     
    } catch (e) {
      console.log(e)
      return
    }

    io.emit("chat message", res, res.createdAt)
  })

  // Recuperar mensajes sin conexion
  if (!socket.recovered) { 
    // ISO to MILISECONDS
    const milisecondsDateClient = new Date(socket.handshake.auth.serverOffset).getTime()

    try {
       await MessageModel.find({
          createdAt: {
            $lt: new Date(milisecondsDateClient)
          }
      })
      .then(messages => { 
           messages.forEach(message => socket.emit("chat message", message, message.createdAt))
        })
      .then(err => new Error(err))      
    } catch (e) {
      console.log(e)
      return
    }
   }
})


app.use(logger("dev"))

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html")
})
 
server.listen(port, () => console.log(`Server runnig at ${port}`))