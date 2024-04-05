import React, { useEffect, useState } from 'react'
import Driver from './driver'
import Order from './order'

function Room({ socket, item }) {
  const [order, setOrder] = useState([])
    useEffect(() => {
        socket.emit('join-room', item)
    })
    useEffect(() => {
        socket.on('post-order', data => {
            console.log(data)
           setOrder((state)=>[...state, data.place===item?data:''])
        })
    },[socket])

    return (
        <div className='w-32 h-full border-2 border-green-500'>
            <div className=' h-1/2 border-b-2 border-red-500 flex flex-col-reverse items-end gap-1'>
                {order.map((item,idx)=>{
                    if(item) return<Order number={item.customerNumber} key={idx} />
                })}
            </div>
            <h4 className='text-center text-base font-bold uppercase text-red-500'>{item}</h4>
            <div className='border-t-2 border-red-500 h-1/2 flex gap-1 flex-col'>
                {/* <Driver count={0} />
                <Driver count={1} /> */}
            </div>
        </div>
    )
}

export default Room