import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useAuthContext } from "./hooks/useAuthContext"

import LandingPage from "./pages/LandingPage"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UserDetails from "./pages/UserDetails"
import Cart from "./pages/Cart"
import FinishedOrder from "./pages/FinishedOrder"
import Navbar from "./components/Navbar"

function App() {

    const { user } = useAuthContext()

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/login" element={
                    user ? <Navigate to="/user" /> : <Login />
                } />
                <Route path="/signup" element={
                    user ? <Navigate to="/user" /> : <Signup />
                } />
                <Route path="/user" element={
                    !user ? <Navigate to="/login" /> : <UserDetails />
                } />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/:order" element={<FinishedOrder />} />
            </Routes>
        </div>
    )
}

export default App
