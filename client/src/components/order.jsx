import React, { useEffect, useState } from 'react'

function Order({number}) {
  return (
    <div className='w-full border-2 rounded-lg border-red-500 h-14'>
        <p className='font-medium text-center text-blue-500'>{number}</p>
    </div>
  )
}

export default Order