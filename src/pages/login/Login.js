import React, { useState } from 'react'
import './Login.css'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    console.log('user loggedIn')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="text"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isLoading && <button className="btn">Login</button>}
      {isLoading && <button className="btn" disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login;
