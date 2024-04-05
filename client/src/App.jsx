import { useEffect, useState } from 'react';
import * as io from 'socket.io-client';
import SendOrder from './components/send-order';
import Orders from './components/orders';
import SendDriver from './components/send-driver';
import Queue from './components/queue';
import axios from 'axios';

const socket = io.connect('http://localhost:4000')


function App() {
  const [rooms, setRooms] = useState([])


  useEffect(() => {
    axios.get('http://localhost:4000/rooms').then(response => {
      setRooms(response.data)
    }).catch(err => {
      console.log('Nimadur xato ketdi ' + err)
    })
  }, [])
  return (
    <>
      <h1 className="text-center text-blue-500 text-3xl font-bold underline">
        Socket queue
      </h1>
      <div className='flex items-start gap-2'>
        <div>
          <SendOrder socket={socket} />
          <SendDriver socket={socket} />
        </div>
        <Queue rooms={rooms} socket={socket}/>
        <Orders socket={socket} />
      </div>
    </>
  )
}

export default App
