import "./LandingPage.css"
import { Link } from "react-router-dom"

export default function LandingPage() {
    
    return (
        <section className="landing-page">
            <div className="landing-page-img">
                <img loading="lazy" src="/assets/small-wireless-speaker.jpg" alt="Landing Page Image" />
                <div className="landing-page-text container">
                    <h2>Lorem, ipsum dolor.</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non error voluptatem sed veniam optio possimus, doloremque nihil, quod ab quia temporibus asperiores quis similique nam!
                    </p>
                    <Link to="/products">
                        <i className="bi bi-arrow-right-circle-fill"></i>
                        <span>Browse Products</span>
                    </Link>
                </div>
            </div>
            <div className="product-menu container">
                <div className="product-menu-item">
                    <i className="bi bi-speaker"></i>
                    <h2>Speakers</h2>
                </div>
                <div className="product-menu-item">
                    <i className="bi bi-earbuds"></i>
                    <h2>Headphones</h2>
                </div>
                <div className="product-menu-item">
                    <i className="bi bi-phone-fill"></i>
                    <h2>Phone Cases</h2>
                </div>
                <div className="product-menu-item">
                    <i className="bi bi-smartwatch"></i>
                    <h2>Watches</h2>
                </div>
            </div>
        </section>
    )
}
