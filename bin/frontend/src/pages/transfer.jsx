import axios from "axios"
import { AuthContext } from "../context/Authcontext"
import { useContext, useEffect, useState } from "react"

export const Transfer = () => {

    const [fromAccount, setfromAccount] = useState(null)
    const [toAccount, settoAccount] = useState(0)
    const [amount, setAmount] = useState(0)
    const [loads, setLoads] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const { user } = useContext(AuthContext)
    useEffect(() => {
        const getdata = async () => {
            try {
                setLoads(true)
                if (!user) {
                    setLoads(false)
                    return
                }
                const response = await axios.get(`http://localhost:8080/account/getaccount/${user.userId}`, { headers: { Authorization: `Bearer ${user.token}` } });
                setfromAccount(response.data.id);
                setLoads(false)

            }
            catch (err) {
                setLoads(false)
                setError(err.message)
            }
        }
        getdata()
    }, [user])
    const handleTransfer = async (event) => {
        setError("")
        setMessage("")
        if (toAccount <= 0) {
            setError("enter valid toAccount");
            return;
        }
        if (amount <= 0) {
            setError("enter amount more than 0");
            return;
        }
        if (parseInt(fromAccount) === toAccount) {
            console.log(fromAccount)
            setError("toAccount Id not be same")
            return
        }
        try {
            setLoads(true)
            const response = await axios.post("http://localhost:8080/transactions/transfer", { fromAccount, toAccount, amount }, { headers: { Authorization: `Bearer ${user.token}` } });
            settoAccount(0);
            setAmount(0)
            setLoads(false)
            setMessage(`Your amount ${amount} send successfully to ${toAccount}`)
        } catch (err) {
            setLoads(false)
            setError(err.message)
        }
    }

    return (
        <>
            <h1>Amount transferring from account Id{fromAccount}</h1>
            <input
                id="toAccount"
                type="number"
                placeholder="Enter receiver account Id"
                value={toAccount}
                onChange={e => settoAccount(e.target.valueAsNumber || -1)}
            />
            <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.valueAsNumber || -1)}
            />
            <button onClick={handleTransfer} disabled={loads}>{loads?"please wait...":"Transfer"}</button>
            <p>{error===""?message:error}</p> 
        </>
    )
}