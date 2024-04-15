import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function DriverRoom({ socket }) {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('room')) {
      socket.emit('join-room', localStorage.getItem('room'))
    }
  }, [])
  useEffect(() => {
    // socket.on('post-order', data => {
    //   setOrder((state) => [...state, data])
    //   console.log(data)
    // })
    socket.on('new-order', data=>{
      setOrder((state) => [...state, data])
        console.log(data)
    })

  }, [socket])

  function leaveHandle(){
    socket.emit('leave-driver-room', localStorage.getItem('room'))
    localStorage.removeItem('room')
    navigate('/driver')
  }
  function receiverOrder(){
    socket.emit('receiver-order')
    navigate('/on-the-way')
  }
  return (
    <div className='flex justify-between'>
      <div>
        {order.map((item, idx) => {
          return (
            <div className='border-2 w-40 h-16 flex flex-col items-center justify-center rounded-xl mb-2' key={idx}>
              <h5>{item}</h5>
              <p>{Date.now()}</p>
              <button className='bg-green-600 px-2 py-5 rounded-2xl cursor-pointer' onClick={receiverOrder}>Receiver</button>
              {/* <p>{item.customerNumber}</p> */}
            </div>
          )
        })}
      </div>
      <div>
        <button className='bg-blue-500 text-white text-3xl px-6 py-3 rounded-2xl m-8' onClick={leaveHandle}>Leave Room</button>
      </div>
    </div>
  )
}

export default DriverRoom