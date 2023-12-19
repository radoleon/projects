import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import Error from "../components/Error"
import { useGetProducts } from "../hooks/useGetProducts"
import "./Products.css"

export default function Products() {
    
    const { documents, error } = useGetProducts()
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState(null)

    useEffect(() => {

        if (documents && !filter) {
            setProducts(documents)
        }
        if (documents && filter) {
            const filteredDocuments = documents.filter(doc => doc.category == filter)
            setProducts(filteredDocuments)
        }

    }, [documents, filter])
    
    return (
        <section className="products container">
            <div className="filter">
                <h2>Filter:</h2>
                <span 
                    className={!filter ? "active" : ""}
                    onClick={() => setFilter(null)}
                >All</span>
                <span 
                    className={filter == "stereo" ? "active" : ""}
                    onClick={() => setFilter("stereo")}
                >Stereo</span>
                <span 
                    className={filter == "accessories" ? "active" : ""}
                    onClick={() => setFilter("accessories")}
                >Accessories</span>
                <span 
                    className={filter == "watches" ? "active" : ""}
                    onClick={() => setFilter("watches")}
                >Watches</span>
            </div>

            <div>
                <h2 className="products-message">
                    {products && `Showing ${products.length} products ${filter ? "in category " + filter : ""}`}
                </h2>
                <div className="product-items">
                    {products && products.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
            {error && <Error message={error} />}
        </section>
    )
}
