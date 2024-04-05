import React, { useEffect, useState } from 'react'

function Order({number}) {
  return (
    <div className='w-full border-2 rounded-lg border-red-500 h-14 flex items-center justify-center'>
        <p className='font-medium text-center text-blue-500 text-xl leading-none'>{number}</p>
    </div>
  )
}

export default Order