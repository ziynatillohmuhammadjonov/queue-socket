import React from 'react'
import SendOrder from '../../components/send-order'
import SendDriver from '../../components/send-driver'
import Queue from '../../components/queue'
import Orders from '../../components/orders'
import SendOrderToDriver from '../../components/send-order-to-dirver'
function Home({socket, rooms}) {
    
    function testHandle(){
        socket.on('test', data=>{
            console.log(data)
        })
    }



    return (
        <div>
            <h1 className="text-center text-blue-500 text-3xl font-bold underline">
                Socket queue
            </h1>
            <div className='flex items-start gap-2'>
                <div>
                    <SendOrder socket={socket} />
                    <SendOrderToDriver socket={socket}/>
                    <button className='bg-blue-800 text-white px-7 py-4 rounded-xl text-2xl mx-auto w-full' onClick={()=>{testHandle}}>Test buttoon</button>
                    {/* <SendDriver socket={socket} /> */}
                </div>
                <Queue rooms={rooms} socket={socket} />
                <Orders socket={socket} />
            </div>
        </div>
    )
}

export default Home