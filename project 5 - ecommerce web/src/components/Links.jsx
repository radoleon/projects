import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

export default function Links({ count }) {

    const { user } = useAuthContext()

    return (
        <div className="links">
            <Link to="/products">
                <span className="desc">Products</span>
                <i className="bi bi-earbuds"></i>
            </Link>
            {user && <Link to="/user">
                <span className="desc">User</span>
                <i className="bi bi-person-fill-check"></i>
            </Link>}
            {!user && <Link to="/login">
                <span className="desc">Login</span>
                <i className="bi bi-person-fill-lock"></i>
            </Link>}
            <Link to="/cart">
                <span className="desc">Cart</span>
                <i className="bi bi-basket3-fill"></i>
                {count > 0 && <span className="count">{count}</span>}
            </Link>
        </div>
    )
}
