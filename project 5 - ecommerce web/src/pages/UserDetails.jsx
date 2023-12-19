import { useAuthContext } from "../hooks/useAuthContext"
import { db } from "../firebase/config"
import { useEffect, useState } from "react"
import { doc, getDoc, getDocs, orderBy, query, collection, where } from "firebase/firestore"
import { useLogout } from "../hooks/useLogout"
import Error from "../components/Error"
import "./UserDetails.css"
import TransactionCard from "../components/TransactionCard"

export default function UserDetails() {

    const [userDetails, setUserDetails] = useState({})
    const [userTransactions, setUserTransactions] = useState([])
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const { error: logoutError, logout } = useLogout()

    useEffect(() => {
        if (logoutError) {
            setError(logoutError)
        }
    }, [logoutError])

    useEffect(() => {
        
        setError(null)

        async function getUserDetails() {
            try {
                const snaphost = await getDoc(doc(db, "users", user.uid))
                setUserDetails(snaphost.data())

            } catch (error) {
                setError(error.message)
            }
        }

        async function getUserTransactions() {

            try {
                const dbQuery = query(
                    collection(db, "transactions"), 
                    where("user", "==", user.uid), 
                    orderBy("timestamp", "desc")
                )
    
                const snapshot = await getDocs(dbQuery)
    
                const transDocs = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setUserTransactions(transDocs)
            }
            catch(error) {
                setError(error.message)
            }
        }

        getUserDetails()
        getUserTransactions()
        
    }, [user])

    return (
        <div className="user-details container">
            
            <div className="details">
                <h2 className="details-title">Account Details</h2>
                <div className="properties">
                    <span>First Name: <b>{userDetails.firstName}</b></span>
                    <span>Last Name: <b>{userDetails.lastName}</b></span>
                    <span>Address: <b>{userDetails.address}</b></span>
                    <span>City: <b>{userDetails.city}</b></span>
                    <span>Post Code: <b>{userDetails.postCode}</b></span>
                    <span>Country: <b>{userDetails.country}</b></span>
                </div>
                <button type="button" onClick={logout}>Logout</button>
                {error && <Error style={{width: "100%", marginBlock: "1.5rem"}} message={error}></Error>}
            </div>
            
            {userTransactions.length > 0 &&
            <div className="transactions">
                <h2 className="title">Transactions</h2>
                {userTransactions.map(trans => {
                    return <TransactionCard key={trans.id} details={trans} />
                })}
            </div>}

            {userTransactions.length === 0 && <p className="no-trans">You haven't made any transaction yet!</p> }
        </div>
    )
}
