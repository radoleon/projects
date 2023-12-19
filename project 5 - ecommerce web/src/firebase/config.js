import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAAfY_Z-415h9nTgsA4pBpaqe8oURJVJVU",
    authDomain: "ecommerce-631a5.firebaseapp.com",
    projectId: "ecommerce-631a5",
    storageBucket: "ecommerce-631a5.appspot.com",
    messagingSenderId: "843046066542",
    appId: "1:843046066542:web:1752289ff3fbcf2136c97f"
}

initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()
