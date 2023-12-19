import { useReducer, createContext, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config"

export const AuthContext = createContext()

function authReducer(state, action) {
    switch(action.type) {

        case "LOGIN":
        case "SIGNUP":
        case "LOAD_AUTH":
            return {...state, user: action.payload}

        case "LOGOUT":
            return {...state, user: null}
        
        default:
            return state
    }
}

export function AuthContextProvider({ children }) {

    const [authState, authDispatch] = useReducer(authReducer, { user: null })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            authDispatch({ type: "LOAD_AUTH", payload: user })
            
            unsubscribe()
        })
    }, [])

    return (
        <AuthContext.Provider value={{...authState, authDispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
