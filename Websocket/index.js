import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
app.use(express.static(path.resolve('./public')));

app.get("/",(req,res)=>{
    return res.sendFile('/public/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('userStoppedTyping', (message) => {
        console.log('Message received:', message);
        // Handle the message as needed
    });
});

server.listen(9000, () => {
    console.log('listening on *:9000');
});