import { useState } from "react"
import { Link } from "react-router-dom"
import "./Login.css"
import { useSignup } from "../hooks/useSignup"
import { collection, doc, setDoc } from "firebase/firestore"
import { db, auth } from "../firebase/config"
import { useAuthContext } from "../hooks/useAuthContext"
import Error from "../components/Error"

const initialSignupDataState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
}

export default function Signup() {

    const { signup, error, isPending } = useSignup()
    const [signupData, setSignupData] = useState(initialSignupDataState)

    function handleChange(key, value) {

        setSignupData(prevSignupData => (
            {...prevSignupData, [key]: value}
        ))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        const newUid = await signup(auth, signupData.email, signupData.password)

        const userData = {
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            address: signupData.address,
            city: signupData.city,
            postCode: signupData.postCode,
            country: signupData.country,
        }

        if (newUid) {
            const docRef = doc(collection(db, "users"), newUid)
            await setDoc(docRef, userData)
        }

        setSignupData(initialSignupDataState)
    }

    return (
        <div className="login-signup-form">
            <h2 className="title">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type="email"
                        required
                        onChange={e => handleChange("email", e.target.value)}
                        value={signupData.email}
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password"
                        required
                        onChange={e => handleChange("password", e.target.value)}
                        value={signupData.password}
                    />
                </label>
                <label>
                    First Name:
                    <input 
                        type="text"
                        required
                        onChange={e => handleChange("firstName", e.target.value)}
                        value={signupData.firstName}
                    />
                </label>
                <label>
                    Last Name:
                    <input 
                        type="text"
                        required
                        onChange={e => handleChange("lastName", e.target.value)}
                        value={signupData.lastName}
                    />
                </label>
                <label>
                    Address:
                    <input 
                        type="text"
                        required
                        onChange={e => handleChange("address", e.target.value)}
                        value={signupData.address}
                    />
                </label>
                <label>
                    City:
                    <input 
                        type="text"
                        required
                        onChange={e => handleChange("city", e.target.value)}
                        value={signupData.city}
                    />
                </label>
                <label>
                    Post Code:
                    <input 
                        type="text"
                        required
                        onChange={e => handleChange("postCode", e.target.value)}
                        value={signupData.postCode}
                    />
                </label>
                <label>
                    Country:
                    <input 
                        type="text"
                        required
                        onChange={e => handleChange("country", e.target.value)}
                        value={signupData.country}
                    />
                </label>
                {!isPending && <button>Sign Up</button>}
                {isPending && <button disabled>Loading</button>}
            </form>
            <p className="message">If you already have an account, <Link to="/login">click here to Login</Link></p>
            {error && <Error style={{marginTop: "2rem", width: "100%"}} message={error} />}
        </div>
    )
}
