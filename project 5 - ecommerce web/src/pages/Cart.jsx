import { useCartContext } from "../hooks/useCartContext"
import CartItem from "../components/CartItem"
import "./Cart.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { serverTimestamp, collection, doc, setDoc } from "firebase/firestore"
import { nanoid } from "nanoid"
import { db } from "../firebase/config"
import Error from "../components/Error"

export default function Cart() {

    const { cartState, cartDispatch } = useCartContext()
    const [totalPrice, setTotalPrice] = useState(0)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        
        let sum = 0
        cartState.forEach(item => {
            sum += Number(item.total)
        })

        setTotalPrice(sum)
    }, [cartState])

    async function handleTransaction() {

        setError(null)

        const transObject = {
            products: cartState,
            total: totalPrice,
            timestamp: serverTimestamp(),
            user: user ? user.uid : "guest"
        }

        const transID = nanoid()

        const collectionRef = collection(db, "transactions")
        const docRef = doc(collectionRef, transID)

        try {
            await setDoc(docRef, transObject)
            cartDispatch({type: "EMPTY_CART"})

            navigate(transID, { state: transID })
        } 
        catch (error) {
            setError(error.message)
        }
        
    }

    return (
        <div className="cart container">
            {
            cartState.length > 0 && 
            <div className="cart-items">
                <h2 className="cart-items-heading">Items in cart</h2>
                {cartState.map(item => (
                    <CartItem 
                        key={item.id}
                        details={item}
                        cartDispatch={cartDispatch}
                    />
                ))}
            </div>
            }
            {cartState.length === 0 && <p className="message">No items in the cart!</p>}
            
            <div className="checkout">
                
                {!user && <div className="no-user-message">
                    <p className="title">
                        <i className="bi bi-exclamation-circle-fill"></i>
                        <span>Not logged in!</span>
                    </p>
                    <p className="description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo repudiandae aut impedit quas tempore adipisci.
                    </p>
                    <div className="auth-buttons">
                        <Link to="/login" className="login">Login</Link>
                        <Link to="/signup" className="signup">Signup</Link>
                    </div>
                </div>}

                {cartState.length > 0 &&
                <div className="payment">
                    <div className="total">
                        <span className="label">Total:</span>
                        <span className="num">{totalPrice.toFixed(2)}$</span>
                    </div>
                    <button onClick={handleTransaction} type="button" className="pay-btn">
                        <i className="bi bi-credit-card-fill"></i>
                        <span>Complete Order</span>
                    </button>
                </div>}

                {error && <Error style={{width: "100%", marginTop: "1.5rem"}} message={error} />}
            </div>
        </div>
    )
}
