import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"



export const useDocument = (col, id) => {
  const [document, setDocument] = useState('')
  const [error, setError] = useState('')

  // realtime data for documents
  useEffect(() => {
    const docRef = doc(db, col, id)

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      // manually throw error if the document doesn't exist or have data
      if (snapshot.data()) {
        // update state
        setDocument({ ...snapshot.data(), id: snapshot.id })
        setError(null)
      } else {
        setError("Document doesn't exist") 
      }
    },(error) => {
      console.log(error)
      setError('Failed to fetch Document')
    })

    // unsubscribe on unmount
    return () => unsubscribe()
      
  }, [col, id])

  return { document, error }

}