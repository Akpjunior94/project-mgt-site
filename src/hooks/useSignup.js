import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { auth, storage, db } from '../firebase/config.js'
import { useAuthContext } from './useAuthContext.js'

const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false) //cleanup function to eraditcate unmounting interuption errors
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()


  const signup = async(email, password, displayName, thumbnail) => {
    setError(null)
    setIsLoading(true)

    
    // sign up user
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const storageRef = ref(storage, uploadPath)

      setIsLoading(true)

      const uploadedImage = await uploadBytes(storageRef, thumbnail)
      const imgURL = await getDownloadURL(storageRef)

      // Add Display Name and photoURL to User
      updateProfile(auth.currentUser, { displayName, photoURL: imgURL })
      setError(false)

      // create a new user document
      await setDoc(doc(db, "users", `${auth.currentUser.uid}`), {
        online: true,
        displayName,
        photoURL: imgURL
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: auth.currentUser})

      // update state
      if (!isCancelled) {
        setIsLoading(false)
        setError(null)
      }

    } 
    catch (err) {
      if (!isCancelled) {
      console.log(err.message)
      setError(err.message)
      setIsLoading(false)
      }
    }
      
  }


  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])
      
  return { error, isLoading, signup }

 
}

export default useSignup
