import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useRef, useState} from 'react'
import { db } from '../firebase/config'



export const useCollection = (c, _q, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // setup query
  const q = useRef(_q).current
  const order = useRef(_orderBy).current


  useEffect(() => {
    // collection ref
    let colRef = collection(db, c)

      
    if (q || order) {
      colRef = query(colRef, where(...q), orderBy(...order))
    }

    // if (order)  {
    //   colRef = query(colRef, orderBy(...order))
    // }

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      let results = []
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id })
      })
      
      // update state
      setDocuments(results)
      setError(null)
    },(error) => {
      console.log(error)
      setError('Could not fetch the data ')
    })

    // unsubscribe on unmount
    return () => unsubscribe()
    
  }, [c, q, order])


  return { documents, error}

}