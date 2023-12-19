import { useState } from 'react'
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"
import { useAuthContext } from "../hooks/useAuthContext"

export function useLogout() {
    
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { authDispatch } = useAuthContext()

    async function logout() {
        
        setIsPending(true)
        setError(null)
        
        try {
            await signOut(auth)
            authDispatch({ type: "LOGOUT" })
        }
        catch(error) {
            setError(error.message)
        }
        finally {
            setIsPending(false)
        }
    }

    return {error, isPending, logout}
}
