import styles from "./transfer.module.css"
import axios from "axios"
import { AuthContext } from "../context/Authcontext"
import { useContext, useEffect, useState } from "react"

export const Transfer = () => {
    const [error, setError] = useState({ field: "", message: "" });
    const [account, setAccount] = useState([])
    const [fromAccount, setfromAccount] = useState("")
    const [toAccount, settoAccount] = useState("")
    const [amount, setAmount] = useState("")
    const [errMessage, seterrMessage] = useState("");
    const [loads, setLoads] = useState(false)
    const [message, setMessage] = useState("");
    const { user } = useContext(AuthContext)
    useEffect(() => {
        const getdata = async () => {
            try {
                setLoads(true)
                if (!user) {
                    setLoads(false)
                    return
                }
                const response = await axios.get(`http://localhost:8080/account/getallaccount/${user.userId}`, { headers: { Authorization: `Bearer ${user.token}` } });
                setAccount(response.data);
                setfromAccount(response.data[0].id)
                setLoads(false)
            }
            catch (err) {
                setLoads(false)
                seterrMessage(err.message)
            }
        }
        getdata()
    }, [user])
    const handleTransfer = async (event) => {
        if (toAccount <= 0) {
            setError({ field: "toAccount", message: "enter valid toAccount" });
            return;
        }
        if (amount <= 0) {
            setError({ field: "amount", message: "enter amount more than 0" });
            return;
        }
        if (parseInt(fromAccount) === toAccount) {
            console.log(fromAccount)
            setError({ field: "toAccount", message: "toAccount Id not be same" });
            return
        }
        try {
            setLoads(true)
            const response = await axios.post("http://localhost:8080/transactions/transfer", { fromAccount, toAccount, amount }, { headers: { Authorization: `Bearer ${user.token}` } });
            setError({ field: "", message: "" })
            settoAccount("");
            seterrMessage("")
            setMessage("")
            setAmount("")
            setLoads(false)
            setMessage(`Your amount ${amount} send successfully to ${toAccount}`)
            const resp = await axios.get(`http://localhost:8080/account/getallaccount/${user.userId}`, { headers: { Authorization: `Bearer ${user.token}` } });
            setAccount(resp.data);
            setfromAccount(resp.data[0].id)
        } catch (err) {
            setLoads(false)
            console.log(err.response.data.error)
            seterrMessage(err.response.data.error)
        }
    }

    return (
        <div className={`d-flex flex-column justify-content-center align-items-center min-vh-100 ${styles.transferWrapper}`}>
            <div className={`d-flex flex-column justify-content-center align-items-center gap-3 bg-white p-5 ${styles.transferBox}`}>
                <h4>Transfer Amount</h4>
                <div>
                    <label className="form-label" htmlFor="accounts">From Account</label>
                    {<select className="form-control" name="accounts" id="accounts" value={fromAccount} onChange={(e) => setfromAccount(e.target.value)}>
                        {account.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.accountNumber} - {acc.balance}</option>
                        ))}
                    </select>}
                </div>
                <div>
                    <label className="form-label" htmlFor="toAccount">To Account</label>
                    <input
                        className="form-control"
                        id="toAccount"
                        type="number"
                        placeholder="Enter receiver account Id"
                        value={toAccount}
                        onChange={e => settoAccount(e.target.value === "" ? "" : e.target.valueAsNumber)}
                    />
                    {error.field === "toAccount" && <p className="text-danger small mb-0">{error.message}</p>}
                </div>
                <div>
                    <label className="form-label" htmlFor="amount">Amount</label>
                    <input
                        className="form-control"
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value === "" ? "" : e.target.valueAsNumber)}
                    />
                    {error.field === "amount" && <p className="text-danger small mb-0">{error.message}</p>}
                </div>
                <button className="btn btn-primary w-100 fw-semibold" onClick={handleTransfer} disabled={loads}>{loads ? "please wait..." : "Transfer"}</button>
                {errMessage && <p className="text-danger small">{errMessage}</p>}
                <p className="text-success fw-semibold">{message}</p>
            </div>
        </div>
    )
} 