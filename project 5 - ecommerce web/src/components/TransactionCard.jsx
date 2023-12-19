import { format } from "date-fns"

export default function TransactionCard({ details }) {
    return (
        <div className="transaction-card">
            <p className="date">{format(details.timestamp.toDate(), "dd. MM. yyyy HH:mm")}</p>
            <div className="box">
                <p className="id">{details.id}</p>
                {details.products.map(item => (
                    <div key={item.id} className="items">
                        <span className="qty">{item.quantity}x</span>
                        <span className="name">{item.title}</span>
                        <span className="price">{item.total.toFixed(2)}$</span>
                    </div>
                ))}
                <div className="total">{details.total.toFixed(2)}$</div>
            </div>
        </div>
    )
}
