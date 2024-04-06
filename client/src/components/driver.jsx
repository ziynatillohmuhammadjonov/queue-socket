import React from 'react'

function Driver({data}) {
  return (
    <div className='w-full border-2 rounded-lg border-red-500 h-14'>
        <p className='font-medium text-center text-blue-500'>{data.carNumber}</p>
        {/* <p className='font-medium text-center text-blue-500'>40Z608XA</p> */}
        <p className='font-medium text-center text-yellow-500'>{data.place}</p>
    </div>
  )
}

export default Driver