import React, { useEffect, useState } from 'react'

function DriverRoom({ socket }) {
  const [order, setOrder] = useState([]);
  useEffect(()=>{
    if(localStorage.getItem('room')){
      socket.emit('join-room',localStorage.getItem('room'))
    }
  },[])
  useEffect(() => {
    socket.on('post-order', data => {
      setOrder((state) => [...state, data])
      console.log(data)
    })

  }, [socket])
  return (
    <div>
      {order.map((item, idx) => {
        return (
          <div className='border-2 w-40 h-16 flex flex-col items-center justify-center rounded-xl mb-2'>
            <h5>{item.place}</h5>
            <p>{item.customerNumber}</p>
          </div>
        )
      })}
    </div>
  )
}

export default DriverRoom