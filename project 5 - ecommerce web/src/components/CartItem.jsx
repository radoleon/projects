export default function CartItem({ details, cartDispatch }) {
    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={details.img} alt="Cart Item Image" />
            </div>
            <div className="cart-item-text">
                <p className="title">{details.title}</p>
                <p className="price">{details.price}$</p>
                <p className="qty">{details.quantity}x</p>
                <p className="total">{details.total.toFixed(2)}$</p>
                <i 
                    className="bi bi-trash-fill del"
                    onClick={() => cartDispatch({ type: "REMOVE_FROM_CART", payload: details.id })}
                >
                </i>
            </div>
        </div>
    )
}
