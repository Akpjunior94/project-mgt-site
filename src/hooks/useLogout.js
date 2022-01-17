import { signOut, updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from '../firebase/config.js'
import { useAuthContext } from "./useAuthContext"




export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false) //cleanup function to eraditcate unmounting interuption errors
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch, user } = useAuthContext()


  const logout = async () => {
    setError(null)
    setIsLoading(true)
  
  // sign the user out
  try {
    // update online state
    const { uid } = user
    const docRef = doc(db, "users", uid)
    await updateDoc(docRef, { online: false })

    // signing out users
    await signOut(auth)

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

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

  return { logout, error, isLoading }

}