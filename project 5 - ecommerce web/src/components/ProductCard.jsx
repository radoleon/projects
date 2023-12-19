import { useEffect, useState } from "react"
import { storage } from "../firebase/config"
import { getDownloadURL, ref } from "firebase/storage"
import { Link } from "react-router-dom"

export default function ProductCard({ product }) {

    const [img, setImg] = useState(null)
    
    useEffect(() => {
        getDownloadURL(ref(storage, product.photoURL)).then(url => {
            setImg(url)
        }).catch(error => console.error(error))
    }, [])
    
    return (
        img &&
        <div className="product-card">
            <div className="product-card-img">
                <img loading="lazy" src={ img } alt="Product Image" />
            </div>
            <div className="product-card-info">
                <p className="title">{product.title}</p>
                <div className="flex">
                    <span className="price">{product.price}$</span>
                    <Link 
                        to={product.id}
                        state={{
                            id: product.id,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                            img: img,
                        }}
                    >Buy</Link>
                </div>
            </div>
        </div>
    )
}
