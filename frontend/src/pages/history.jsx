import axios from "axios"
import { useEffect, useState } from "react"
export const History = ({ accountId }) => {
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
        <>
            {load && <p>Loading transactions...</p>}
            {transactionHistory.length === 0 ? error :
                <table>
                    <thead>
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
                            <tr key={transaction.id}><td>{transaction.id}</td><td>{transaction.type}</td><td>{transaction.amount}</td><td>{transaction.direction}</td><td>{transaction.timestamp}</td><td>{transaction.counterpartyAccountId}</td></tr>
                        )}
                    </tbody>
                </table>
            }
        </>
    )
}