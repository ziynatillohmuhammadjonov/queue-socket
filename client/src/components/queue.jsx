import React, { useEffect, useState } from 'react'
import Order from './order'
import Driver from './driver'
import Room from './room'

function Queue({ socket, rooms }) {
 
    return (
        <div className='w-[1000px] border-2 rounded-lg h-screen gap-1 flex'>
            {rooms.map((item, idx) => <Room socket={socket} item={item} key={idx}/>)}
            <Room/>

        </div>
    )
}

export default Queue