import cors from 'cors';
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4001;
app.use(cors())

const server = createServer(app)

const rooms: string[] = ['fergana', 'quva', 'qoshkechik', 'toshloq']
const messageQueues: { [room: string]: string[] } = {}

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
const customIds = new Map()

const driverArray:string[] =[]
const orderArray:string[]=[]
const onthewayArray:string[]=[]

io.on('connection', (socket: Socket) => {
  socket.on('join-room', (data: string) => {
    socket.join(data);
    // console.log(`${socket.id} joined room ${data}`);
    // if(!messageQueues[data]){
    //   messageQueues[data]=[]
    // }
  });

  // socket.on('test-msg', (data: { place: string, customerNumber: any }) => {
  //   if (socket.rooms.has(data.place)) {
  //     io.in(data.place).emit('test-msg', data.customerNumber);
  //   } else {
  //     console.log(`Socket is not in room ${data.place}`);
  //   }
  // });
  socket.on('join-driver', (data: { place: string, poz:string, carNumber: string }) => {
    socket.join(data.place)
    io.in(data.place).emit('add-driver', data)
    console.log(data.carNumber + ' joined ' + data.place + ' id driver ' + socket.id)
    
    socket.on('leave-driver-room', (driveData: string) => {
      console.log(socket.id + ' li xaydovchi xonadan chiqib ketdi...')
      socket.leave(driveData)
    })
    
    socket.on('receiver-order',()=>{
      clearInterval(interval)
      socket.leave(data.place)
      console.log(`${socket.id} leave room ${data.place}`)

    })
    return customIds.set(data.poz, socket.id)
    // console.log(customIds)
  })


  // kelgan buyurtmani tegishli xonaga yuboramiz
  socket.on('add-order', (data: { place: string, customerNumber: string }) => {
    io.in(data.place).emit("post-order", data)
    startSendingMessages(data)

  })

  // send to driver 
  socket.on('add-order-to-driver',(data:{place:string, poz:string, customerNumber: string})=>{
    if(customIds.has(data.poz)){
      console.log(customIds.get(data.poz))
      const driverSocketId = customIds.get(data.poz); // Получаем соответствующий socket.id
      socket.to(driverSocketId).emit('new-order',data.customerNumber)
      customIds.delete(data.poz)
    }else{
      io.emit('error', "Mavjud bo'lmagan poz")
    }
  })


  // Обработка события 'leave-room'
  socket.on('leave-room', (room: string) => {
    socket.leave(room);
    // console.log(`${socket.id} left room ${room}`);

  });

  // Дополнительный код
  // Функция для отправки сообщений поочередно
  function startSendingMessages(data: any) {
    const room = io.sockets.adapter.rooms.get(data.place);
    const users: string[] = [];
    if (room) {
      room.forEach(socketId => {
        const socket = io.sockets.sockets.get(socketId);
        if (socket) {
          users.push(socket.id); // or any other socket property you need
        }
      });
    } else {
      // Handle the case where the room doesn't exist
    }
    for (let i = 0; i < users.length; i++) { 
      const userId = users[i];
      interval = setInterval(() => {

        // Отправляем сообщение только определенному пользователю
        socket.to(userId).emit('new-order', data.customerNumber);

        // Переходим к следующему пользователю

        // if (messageQueues[channel].length > 0) {
        //   const message = messageQueues[channel].shift();
        //   const userId = users[index];

        //   // Отправляем сообщение только определенному пользователю
        //   io.to(userId).emit('newMessage', message);

        //   // Переходим к следующему пользователю
        //   index = (index + 1) % users.length;
        // } else {
        //   clearInterval(interval);
        // }
      }, 5000); // Интервал между отправкой сообщений (в миллисекундах)

    }
  }
});




server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});