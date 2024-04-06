import express, { Express, Request, Response } from "express";
import { createServer } from 'node:http'
import { Server, Socket } from 'socket.io'
import dotenv from "dotenv";
import cors from 'cors';
import { channel } from "node:process";

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
let interval: any
app.get('/rooms', (req: Request, res: Response) => {
  res.send(rooms)
})
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

io.on('connection', (socket: Socket) => {
  socket.on('join-room', (data: string) => {
    socket.join(data);
    // console.log(`${socket.id} joined room ${data}`);
  });

  // socket.on('test-msg', (data: { place: string, customerNumber: any }) => {
  //   if (socket.rooms.has(data.place)) {
  //     io.in(data.place).emit('test-msg', data.customerNumber);
  //   } else {
  //     console.log(`Socket is not in room ${data.place}`);
  //   }
  // });
  console.log(io.sockets.adapter.rooms)
  socket.on('join-driver', (data: { place: string, carNumber: string }) => {
    socket.join(data.place)
    // console.log(data.carNumber+' joined '+data.place)



  })
  // kelgan buyurtmani tegishli xonaga yuboramiz
  socket.on('add-order', (data: { place: string, customerNumber: string }) => {
    io.in(data.place).emit("post-order", data)

  })

  // Обработка события 'leave-room'
  socket.on('leave-room', (room: string) => {
    socket.leave(room);
    // console.log(`${socket.id} left room ${room}`);

  });

  // Дополнительный код
  // Функция для отправки сообщений поочередно
  function startSendingMessages(channel: string) {
    const room = io.sockets.adapter.rooms.get(channel);
    const users: string[] = [];
    if (room) {
      room.forEach(socketId => {
        const socket = io.sockets.sockets.get(socketId);
        if (socket) {
          users.push(socket.id); // or any other socket property you need
        }
      });
      console.log(users);
    } else {
      // Handle the case where the room doesn't exist
    }
    let index = 0;

    interval = setInterval(() => {
      if (messageQueues[channel].length > 0) {
        const message = messageQueues[channel].shift();
        const userId = users[index];

        // Отправляем сообщение только определенному пользователю
        io.to(userId).emit('newMessage', message);

        // Переходим к следующему пользователю
        index = (index + 1) % users.length;
      } else {
        clearInterval(interval);
      }
    }, 5000); // Интервал между отправкой сообщений (в миллисекундах)
  }

});




server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});