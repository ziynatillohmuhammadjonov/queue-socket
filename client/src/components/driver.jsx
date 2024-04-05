import React from 'react'

function Driver({count}) {
  return (
    <div className='w-full border-2 rounded-lg border-red-500 h-14'>
        <p className='font-medium text-center text-blue-500'>{count}</p>
        {/* <p className='font-medium text-center text-blue-500'>40Z608XA</p> */}
        <p className='font-medium text-center text-yellow-500'>Toshloq</p>
    </div>
  )
}

export default Driver