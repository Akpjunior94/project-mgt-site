import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useReducer, useEffect, useState } from "react"
import { db } from '../firebase/config'

let initialState = {
  document: null,
  isLoading: false,
  error: null,
  success: null
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    // case value:
    case 'IS_LOADING' :
      return { isLoading: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isLoading: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isLoading: false, document: null, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return { isLoading: false, document: action.payload, success: true, error: null }
    case 'ERROR':
      return { isLoading: false, document: null, success: false, error: action.payload }
    default:
      return state;
  }
}

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const colRef = collection(db, col)

  // onli dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }


  // Adding document
  const addDocument = async(newDoc) => {
    dispatch({type: 'IS_LOADING'})

    try {
      // Update the timestamp field with the value from the server
      const createdAt = serverTimestamp()
      console.log('new project doc:', newDoc)
      const data = { ...newDoc, createdAt }
      const addedDocument = await addDoc(colRef, data)
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument})
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }

  }

  // deleting document
  const deleteDocument = async(id) => {
    // document ref
    const docRef = doc(db, col, id)

    dispatch({type: 'IS_LOADING'})
    
    try {
      await deleteDoc(docRef)
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete'})
    }

  }


  // update document
  const updateDocument = async(id, updates) => {
    dispatch({ type: 'IS_LOADING' })

    // docRef
    const docRef = doc(db, col, id)

    try {
      const updatedDocument = await updateDoc(docRef, updates)
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument})
    } catch (err) {
      console.log(err)
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message})
    }
  }


  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }
}