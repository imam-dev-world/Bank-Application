import styles from "./dashboard.module.css"
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
    const handleNavigation = () => {
        navigate("/transfer")
    }
    return (
        <div className={`p-5 min-vh-100 ${styles.dashboardWrapper}`}>

            <section className={`d-flex justify-content-between align-items-center mb-4 ${styles.dashboardHeader}`}>
                <div>
                    <h3>Welcome, {user.name}</h3>{account.length === 0 ? <p>You have no account yet. Please create one.</p> : <span className="text-secondary"> Your Balance: ₹{account[0].balance}</span>}
                </div>
                <div className="d-flex gap-2">
                    {account.length !== 0 && <button className="btn btn-primary fw-semibold" onClick={handleNavigation}>Transfer Amount</button>}
                    <button className="btn btn-outline-primary bg-white fw-semibold" onClick={handleOpenModal}>+ New Account</button>
                </div>
            </section>


            {showCreateModal && (
                <section className={`d-flex flex-column mt-3 mb-3 p-3 gap-3 ${styles.newAccountPanel}`}>
                    <span className="text-secondary">NEW ACCOUNT</span>
                    <div  >
                        <select className="w-100 p-2 bg-white rounded-3 border" name="Accounttype" id="Accounttype" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                        </select>
                    </div>


                    <div className="d-flex gap-2 ">
                        <button className="ps-4 pe-4 rounded-3 btn btn-primary fw-semibold" onClick={handleCreateAccount}>Create</button>
                        <button className="ps-4 pe-4 rounded-3 btn btn-muted bg-white border text-secondary" onClick={() => setshowCreateModal(false)}>Cancel</button>
                    </div>
                </section>)}

            <section>
                {account.length !== 0 && <History accountId={account[0].id} />}
            </section>
        </div>
    )
}