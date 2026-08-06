import styles from "./history.module.css"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/Authcontext"
export const History = ({ accountId }) => {
    const { user } = useContext(AuthContext)
    const [error, setError] = useState("");
    const [load, setLoad] = useState(false);
    const [currentPage,setCurrentPage]=useState(0);
    const [transactions,setTransactions]=useState([]);
    const [totalPage,setTotalPage]=useState(0);

    useEffect(() => {
        const getHistoryData = async () => {
            try {
                setLoad(true)
                setError("");   
                const response = await axios.get(`http://localhost:8080/transactions/history/${accountId}?page=${currentPage}&size=10`, { headers: { Authorization: `Bearer ${user.token}` } })
                setTransactions(response.data.content);
                setTotalPage(response.data.totalPages)
                if (response.data.content.length === 0) {
                    setError("No Transactions found")
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoad(false)
            }
        }
        getHistoryData()
    }, [accountId,currentPage])
    const handlePreviousButton =()=> currentPage<1?"":setCurrentPage(currentPage-1)

    const handleNextButton =()=> totalPage-1===currentPage?"":setCurrentPage(currentPage+1);
    return (
        <div className={`bg-white ${styles.historyWrapper}`} >
            {load && <p>Loading transactions...</p>}
            {transactions.length === 0 ? error :
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Id</th>
                            <th>type</th>
                            <th>amount</th>
                            <th>direction</th>
                            <th>timestamp</th>
                            <th>counterpartyAccountId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) =>
                            <tr key={transaction.id}><td>{transaction.id}</td><td>{transaction.type}</td><td>{transaction.amount}</td><td><span className={transaction.direction === "DEBIT" ? styles.badgeDebit : styles.badgeCredit}>{transaction.direction}</span></td><td>{transaction.timestamp}</td><td>{transaction.counterpartyAccountId}</td></tr>
                        )}
                    </tbody>
                </table>
            }
            <div className="d-flex align-items-center gap-2 mb-4 mt-3 me-4 justify-content-center">
            <button onClick={handlePreviousButton} disabled={currentPage === 0} className="btn btn-light fw-semibold btn-outline-secondary text-black">Previous</button>
            <span className="fw-semibold">Page {currentPage+1} of {totalPage}</span>
            <button onClick={handleNextButton} disabled={currentPage === totalPage - 1} className="btn btn-light fw-semibold btn-outline-secondary text-black">next</button>
            </div>
        </div>
    )
}