import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {
  
  const user = localStorage.getItem("userToken")
  const logOut =()=>{
    localStorage.removeItem("userToken")
    localStorage.removeItem("userData")
    window.location.href='/login'
  }
  return (
    <div className='Header'>
       
        {user ?  <>
        <Link to={'/'} className='link'>Home</Link>
        <Link to={'/places'} className='link'>Places</Link>
        <Link to={'/places/new'} className='link'> New Place</Link>
          <Link onClick={logOut} className='link logout'> Log out</Link>
          </>
          :
          <>
          <Link to={'/login'} className='link'> Login</Link>
          <Link to={'/sing-up'} className='link'> Sign Up</Link>

          </>
          
          
        }
        

    </div>
  )
}
