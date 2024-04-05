import express, { Express, Request, Response } from "express";
import {createServer} from 'node:http'
import {Server, Socket} from 'socket.io'
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4001;
app.use(cors())

const server =  createServer(app)
const rooms:string[]=['fergana','quva','qoshkechik','toshloq']
const io =new Server(server,{
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
})

app.get('/rooms',(req:Request, res:Response)=>{
  res.send(rooms)
})
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

io.on('connection',(socket:Socket)=>{
    // console.log(`${socket.id} connected server`)
    socket.on('add-order',data=>{
      socket.emit('post-order',data)
      
    })
})


server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});