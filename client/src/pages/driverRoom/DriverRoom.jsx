import React, { useEffect, useState } from 'react'

function DriverRoom({ socket }) {
  const [order, setOrder] = useState([])
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
          <>
            <h5>{item.place}</h5>
            <p>{item.customerNumber}</p>
          </>
        )
      })}
    </div>
  )
}

export default DriverRoom