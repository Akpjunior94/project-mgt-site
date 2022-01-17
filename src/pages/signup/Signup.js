import React, { useState } from 'react'
import useSignup from '../../hooks/useSignup'
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isLoading, error } = useSignup()


  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }

  const handleFileChange = (e) => {
    setThumbnail(null)

    let selected = e.target.files[0]
    console.log(selected)

    // check for file type and size and handle undefined value
    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected files must be an Image')
      return
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated')
  }


  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
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
      <label>
        <span>display name:</span>
        <input
          required
          type="text"
          onChange={(e)=>setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input
          required
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <p className='error'>{thumbnailError}</p>}
      </label>
      {!isLoading && <button className="btn">Signup</button>}
      {isLoading && <button className="btn" disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup;
