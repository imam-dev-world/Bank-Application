import axios from "axios"
import { AuthContext } from "../context/Authcontext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { History } from "./history"
export const Dashboard = () => {
    const [account, setaccount] = useState([])
    const { user } = useContext(AuthContext)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [accountType, setAccountType] = useState("Savings");
    const [showCreateModal, setshowCreateModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getdata = async () => {
            try {
                if (user === null) {
                    setError("user not found")
                    return
                }
                setLoading(true)
                const response = await axios.get(`http://localhost:8080/account/getallaccount/${user.userId}`, { headers: { Authorization: `Bearer ${user.token}` } });
                setaccount(response.data);
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        getdata()
    }, [])
    if (loading) {
        return <p>your dashboard is loading...</p>
    }
    if (error) {
        return <p>Something went wrong {error}</p>
    }
    const handleOpenModal = () => {
        setshowCreateModal(true)
    }
    const handleCreateAccount = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/account/create/${user.userId}`, { accountType }, { headers: { Authorization: `Bearer ${user.token}` } })
            setaccount([...account, res.data]);
        } catch (err) {
            setError(err.message);
        } finally {
            setshowCreateModal(false)
        }
    }
    const handleNavigation = () =>{
        navigate("/transfer")
    }
    return (
        <>
            <h1>welcome {user.name}</h1>{account.length === 0 ? <p>You have no account yet. Please create one.</p> : <h1>Balance: {account[0].balance}</h1>}
            {account.length!==0&&<button onClick={handleNavigation}>Transfer Amount</button>}
            <button onClick={handleOpenModal}>+ New Account</button>
            {account.length !== 0&&<History accountId={account[0].id}/>}
            {showCreateModal && <select name="Accounttype" id="Accounttype" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
            </select>}
            {showCreateModal && (
                <>
                    <button onClick={handleCreateAccount}>Create</button>
                    <button onClick={() => setshowCreateModal(false)}>Cancel</button>
                </>
            )}
        </>
    )
}