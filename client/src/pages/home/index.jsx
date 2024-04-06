import React from 'react'
import SendOrder from '../../components/send-order'
import SendDriver from '../../components/send-driver'
import Queue from '../../components/queue'
import Orders from '../../components/orders'

function Home({socket, rooms}) {
    return (
        <div>
            <h1 className="text-center text-blue-500 text-3xl font-bold underline">
                Socket queue
            </h1>
            <div className='flex items-start gap-2'>
                <div>
                    <SendOrder socket={socket} />
                    {/* <SendDriver socket={socket} /> */}
                </div>
                <Queue rooms={rooms} socket={socket} />
                <Orders socket={socket} />
            </div>
        </div>
    )
}

export default Home