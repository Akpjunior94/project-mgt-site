import { collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase/config"



export const useDocument = ({ col, id }) => {
  const [document, setDocument] = useState('')
  const [error, setError] = useState('')

  // realtime data for documents
  useEffect(() => {
    const colRef = collection(db, col, id)

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
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









}