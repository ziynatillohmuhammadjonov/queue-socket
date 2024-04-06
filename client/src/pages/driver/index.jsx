import React from 'react'
import SendDriver from '../../components/send-driver'

function DriverPage({socket}) {
  return (
    <div className='flex w-full h-screen items-center justify-center'>
        <SendDriver socket={socket}/>
    </div>
  )
}

export default DriverPage