import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyC3ti7Z3ca7cnAjgbpRgxW2_KQ4yPsATfs",
  authDomain: "projectmgtsite-bd1db.firebaseapp.com",
  projectId: "projectmgtsite-bd1db",
  storageBucket: "projectmgtsite-bd1db.appspot.com",
  messagingSenderId: "762377737809",
  appId: "1:762377737809:web:0afb28a925d6cfcf2b8a70"
};

// initialize firebase
initializeApp(firebaseConfig);

// initialize services
const db = getFirestore()
const auth = getAuth()
const storage = getStorage(); 

// timestamp


export {db, auth, storage}
