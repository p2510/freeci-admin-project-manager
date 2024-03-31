import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCAwYxEU8C4fYkwPOv675svSFEASTnHz5M",
  authDomain: "freeci-admin-project-manager.firebaseapp.com",
  projectId: "freeci-admin-project-manager",
  storageBucket: "freeci-admin-project-manager.appspot.com",
  messagingSenderId: "400351793705",
  appId: "1:400351793705:web:cf6d5d28631a3ee3888238",
  measurementId: "G-YT8RXB49SN"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const usersRef = collection(db, 'users')
