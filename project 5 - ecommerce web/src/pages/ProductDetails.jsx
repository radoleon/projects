import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { useCartContext } from "../hooks/useCartContext"
import Error from "../components/Error"
import "./ProductDetails.css"

export default function ProductDetails() {

    const { state: productDetails } = useLocation()
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState(null)
    const { cartDispatch } = useCartContext()

    function handleClick() {
        setError(null)
        
        if (!quantity || quantity > 5 || quantity < 1) {
            setError("Quantity has to be a number between 1 and 5")
            return
        }

        else {
            const objectToAdd = {
                id: productDetails.id,
                title: productDetails.title,
                img: productDetails.img,
                quantity: parseInt(quantity),
                price: productDetails.price,
                total: parseFloat((parseInt(quantity) * parseFloat(productDetails.price)).toFixed(2))
            }

            cartDispatch({type: "ADD_TO_CART", payload: objectToAdd})
        }
    }

    return (
        <div className="product-details">
            <div className="product-details-img">
                <img src={productDetails.img} alt="Product Detail" />
            </div>
            <div className="product-details-text">
                <h2 className="title">{productDetails.title}</h2>
                <p className="desc">{productDetails.description}</p>
                <label className="qty-input">
                    Qty:
                    <input 
                        min="1" 
                        max="5" 
                        type="number" 
                        onChange={e => setQuantity(e.target.value)}
                        value={quantity}
                    />
                </label>
                <div className="buttons">
                    <button className="btn" type="button" onClick={handleClick}>
                        <i className="bi bi-plus-circle-fill"></i>
                        <span>Add to Cart</span>
                    </button>
                    <Link className="btn" to="/cart">
                        <i className="bi bi-basket3-fill"></i>
                        <span>View Cart</span>
                    </Link>
                </div>
                {error && <Error style={{width: "100%", marginTop: "1rem"}} message={error} />}
            </div>
        </div>
    )
}
