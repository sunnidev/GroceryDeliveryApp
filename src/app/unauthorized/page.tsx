import React from 'react'

const Unauthorized = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-50'>
        <h1 className='text-3xl font-extrabold text-red-600'>Access Denied 🚫 </h1>
        <p className='text-xl text-gray-700 mt-2'>You do not have permission to access this page</p>
    </div>
  )
}

export default Unauthorized  