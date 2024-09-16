import { Ollama } from "@langchain/ollama";
import express  from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const port = 4000
app.use(express.json())
app.use(cors());

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const llm = new Ollama({
    model: "llama3.1", // Default value
    temperature: 0,
    maxRetries: 2,
      baseUrl: "http://localhost:11434",
  });

// app.post('/resp/ai',async(req,res)=>{
//     console.log(req.body.message)
//     const inputText = req.body.message+"Explain within 30 words";
//     const completion = await llm.invoke(inputText);
//     // console.log(completion)
//     completion;
//     res.send(completion)
// })

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`)
//   })

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });

  socket.on('userStoppedTyping', async (message) => {
    console.log("Input Message:",message)
    const inputText = message+"Explain within 30 words";
    const completion = await llm.invoke(inputText);
    console.log(completion)
    completion;
    socket.emit("ai_reply",completion)
  });
});

server.listen(port, () => {
  console.log(`listening on ${port}*:`);
});