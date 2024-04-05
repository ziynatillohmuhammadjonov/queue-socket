import express, { Express, Request, Response } from "express";
import { createServer } from 'node:http'
import { Server, Socket } from 'socket.io'
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4001;
app.use(cors())

const server = createServer(app)
const rooms: string[] = ['fergana', 'quva', 'qoshkechik', 'toshloq']
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.get('/rooms', (req: Request, res: Response) => {
  res.send(rooms)
})
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

io.on('connection', (socket: Socket) => {
  socket.on('join-room', (data: string) => {
    socket.join(data);
    console.log(`${socket.id} joined room ${data}`);
  });

  // socket.on('test-msg', (data: { place: string, customerNumber: any }) => {
  //   if (socket.rooms.has(data.place)) {
  //     io.in(data.place).emit('test-msg', data.customerNumber);
  //   } else {
  //     console.log(`Socket is not in room ${data.place}`);
  //   }
  // });

  // kelgan buyurtmani tegishli xonaga yuboramiz
  socket.on('add-order',(data:{place:string, customerNumber:string})=>{
    io.in(data.place).emit("post-order", data)
  })

  // Обработка события 'leave-room'
  socket.on('leave-room', (room: string) => {
    socket.leave(room);
    console.log(`${socket.id} left room ${room}`);
  });

  // Дополнительный код
});



server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});