import { useEffect } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import "./FinishedOrder.css"

export default function FinishedOrder() {

    const { state } = useLocation()
    const { order } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        
        let timeout

        if (order === state) {
            timeout = setTimeout(() => {
                navigate("/")
            }, 4000)
        }
        else {
            navigate(-1)
        }

        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className="finished-order container">
            <div>
                <div className="icon"><i className="bi bi-check-circle-fill"></i></div>
                <h2 className="title">Thanks for your order <span className="order">#{order}</span></h2>
                <p className="message">In a few seconds, you will be redirected to the home screen...</p>
            </div>
        </div>
    )
}
