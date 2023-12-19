import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, getDocs } from "firebase/firestore"

export function useGetProducts() {

    const [documents, setDocuments] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getDocuments() {
            setError(null)
            
            try {
                const snapshot = await getDocs(collection(db, "products"))
                const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setDocuments(documents)
            }
            
            catch (error) {
                setError(error.message)
            }
        }
        getDocuments()

    }, [])

    return { documents, error}
}