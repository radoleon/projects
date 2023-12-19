import { useState } from "react"
import { Link } from "react-router-dom"
import "./Login.css"
import { useLogin } from "../hooks/useLogin"
import { auth } from "../firebase/config"
import Error from "../components/Error"

export default function Login() {

    const [loginData, setLoginData] = useState({email: "", password: ""})
    const { error, isPending, login } = useLogin()

    function handleChange(key, value) {
        setLoginData(prevLoginData => (
            {...prevLoginData, [key]: value}
        ))
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        login(auth, loginData.email, loginData.password)
        setLoginData({email: "", password: ""})
    }

    return (

        <div className="login-signup-form">
            <h2 className="title">Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type="email"
                        required
                        onChange={e => handleChange("email", e.target.value)}
                        value={loginData.email}
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password"
                        required
                        onChange={e => handleChange("password", e.target.value)}
                        value={loginData.password}
                    />
                </label>
                {!isPending && <button>Login</button>}
                {isPending && <button disabled></button>}
            </form>
            <p className="message">If you haven't created an account yet, <Link to="/signup">click here to Sign Up</Link></p>
            {error && <Error message={error} style={{marginTop: "2rem", width: "100%"}} />}
        </div>
    )
}
