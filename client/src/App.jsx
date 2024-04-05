import { useEffect, useState } from 'react';
import * as io from 'socket.io-client';
import SendOrder from './components/send-order';
import Orders from './components/orders';
import SendDriver from './components/send-driver';
import Queue from './components/queue';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/home';
import Driver from './components/driver';

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
    <Router>
      <Routes>
        <Route path='/' element={<Home socket={socket} rooms={rooms} />}></Route>
        <Route path='/driver' element={<Driver/>}/>
      </Routes>
      
    </Router>
  )
}

export default App
