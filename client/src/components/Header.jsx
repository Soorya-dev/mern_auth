import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='text-2xl font-bold'>Auth App</h1>
            </Link>
           
      
      <ul className='flex gap-4'>
      <Link to='/'>
      <li><a href='#'>Home</a></li>
            </Link>
            <Link to='/sign-in'>
            <li><a href='#'>Signin</a></li>
            </Link>
            <Link to='/sign-up'>
            <li><a href='#'>Signup</a></li>
            </Link>
            <Link to='/profile'>
            <li><a href='#'>Profile</a></li>
            </Link>
            <Link to='/about'>
            <li><a href='#'>About</a></li>
            </Link>
        
        
      </ul>

      </div>
      
      </div>
  )
}

export default Header