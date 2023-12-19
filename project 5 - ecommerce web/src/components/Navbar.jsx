import {useState, useEffect } from "react"
import Links from "./Links"
import "./Navbar.css"
import { Link } from "react-router-dom"
import { useCartContext } from "../hooks/useCartContext"

export default function Navbar() {

    const { cartState } = useCartContext()
    const [itemsQuantity, setItemsQuantity] = useState(0)

    let sum = 0;
    useEffect(() => {
        
        cartState.forEach(item => {
            sum += item.quantity
        })

        setItemsQuantity(sum)
    }, [cartState])

    return (
        
        <div className="Navbar">
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/logo/default_transparent.png" alt="Logo" />
                </Link>
                <Links count={itemsQuantity} />
            </div>
        </div>
    )
}
