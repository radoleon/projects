import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { createUserWithEmailAndPassword } from "firebase/auth"

export function useSignup() {
    
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { authDispatch } = useAuthContext()

    async function signup(auth, email, password) {

        setIsPending(true)
        setError(null)

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            authDispatch({ type: "SIGNUP", payload: response.user })

            setIsPending(false)
            return response.user.uid
        }
        catch(error) {
            setError(error.message)
            setIsPending(false)
        }
    }

    return { error, isPending, signup }
}
