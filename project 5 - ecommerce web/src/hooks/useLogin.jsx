import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "../hooks/useAuthContext"

export function useLogin() {

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { authDispatch } = useAuthContext()

    async function login(auth, email, password) {
        
        setIsPending(true)
        setError(null)
        
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            authDispatch({ type: "LOGIN", payload: response.user })
        }
        catch (error) {
            setError(error.message)
        }
        finally {
            setIsPending(false)
        }
    }

    return {error, isPending, login}
}
