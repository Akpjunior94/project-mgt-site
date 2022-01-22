import React from 'react'
import './Navbar.css'
import Logo from '../assets/businessman.png'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout, isLoading } = useLogout()
  const { user } = useAuthContext()


  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Logo} alt="logo"/>
          <span>Project Manager</span>
        </li>

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}

        {user && (
          <li>
            {!isLoading && <button onClick={logout} className="btn">Logout</button>}
            {isLoading && <button className="btn" disabled>Logging out...</button>}
          </li>
        )}
      </ul>
      
    </div>
  )
}

export default Navbar;
