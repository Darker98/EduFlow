import React from 'react'
import { NavLink } from 'react-router-dom'
import {Info, Bell} from 'lucide-react'
import { SidebarTrigger } from './ui/sidebar'

const Navbar = () => {
  return (
    
      <div className='bg-slate-950 flex justify-between rounded h-14 items-center my-2  '>
        <div >
            <div className='flex  items-center  '>
                <SidebarTrigger className='text-white'/>
                <h1 className='font-bold text-2xl text-white'>EduFlow</h1>
            </div>
        </div>
        {/* this will be for not */}
        <div className=' mr-5'>
            <div className='flex items-center gap-4'>
                <NavLink to='/login' className=' text-white p-2 rounded-md'>Login</NavLink>
                <NavLink to='/signup' className=' text-white p-2 rounded-md'>Sign Up</NavLink>
               <NavLink to='/about'><Info className='text-white'/></NavLink>
               <button><Bell className='text-white'/></button>
            </div>
        </div>
      </div>
    
  )
}

export default Navbar
