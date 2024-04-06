import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import * as io from 'socket.io-client';
import DriverPage from './pages/driver';
import Home from './pages/home';
import DriverRoom from './pages/driverRoom/DriverRoom';

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
        <Route path='/driver' element={<DriverPage socket={socket}/>}/>
        <Route path='/driverRoom' element={<DriverRoom socket={socket}/>}/>
      </Routes>
      
    </Router>
  )
}

export default App
