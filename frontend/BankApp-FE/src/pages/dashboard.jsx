import axios from "axios"
import { AuthContext } from "../context/Authcontext"
import { useContext, useEffect, useState } from "react"
export const Dashboard = () => {
    const [account, setaccount] = useState([])
    const { user } = useContext(AuthContext)
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getdata = async () => {
            try{
            if(user===null){
                setError("user not found")
                return
            }
            setLoading(true)
            const response = await axios.get(`http://localhost:8080/account/getallaccount/${user.userId}`, { headers: { Authorization: `Bearer ${user.token}` } });
            setLoading(false)
            setaccount(response.data);
            }catch(e){
                setLoading(false)
                setError(e.message)
            }
        }
        getdata()
    }, [])
    if(account.length===0){
        return <p>No account found. Please open an account.</p>
    }
    return (
        <>
            <h1>Welcome { user.name }</h1>
            <h1>Balance: { account[0].balance }</h1>
        </>
    )
}