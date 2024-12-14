import React from 'react'
import {ClockLoader} from 'react-spinners'
const Spinner = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center'>
      <ClockLoader color="#000000" />
    </div>
  )
}

export default Spinner