import styles from "./history.module.css"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/Authcontext"
export const History = ({ accountId }) => {
    const {user} = useContext(AuthContext)
    const [transactionHistory, settransactionHistory] = useState([]);
    const [error, setError] = useState("");
    const [load, setLoad] = useState(false);
    useEffect(() => {
        const getHistoryData = async () => {
            try {
                setLoad(true)
                const response = await axios.get(`http://localhost:8080/transactions/history/${accountId}`,{ headers: { Authorization: `Bearer ${user.token}` } })
                settransactionHistory(response.data);
                if (response.data.length === 0) {
                    setError("No Transactions found")
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoad(false)
            }
        }
        getHistoryData()
    }, [accountId])

    return (
        <div className= {`bg-white ${styles.historyWrapper}`} >
            {load && <p>Loading transactions...</p>}
            {transactionHistory.length === 0 ? error :
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>id</th>
                            <th>type</th>
                            <th>amount</th>
                            <th>direction</th>
                            <th>timestamp</th>
                            <th>counterpartyAccountId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionHistory.map((transaction) =>
                            <tr key={transaction.id}><td>{transaction.id}</td><td>{transaction.type}</td><td>{transaction.amount}</td><td><span className={transaction.direction==="DEBIT"?styles.badgeDebit:styles.badgeCredit}>{transaction.direction}</span></td><td>{transaction.timestamp}</td><td>{transaction.counterpartyAccountId}</td></tr>
                        )}
                    </tbody>
                </table>
            }
        </div>
    )
}