import axios from "axios"
import { AuthContext } from "../context/Authcontext"
import { useContext, useEffect, useState } from "react"
export const Dashboard = () => {
    const [account, setaccount] = useState([])
    const { user } = useContext(AuthContext)
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [accountType, setAccountType] = useState("");
    const [showCreateModal, setshowCreateModal] = useState(false)

    useEffect(() => {
        const getdata = async () => {
            try{
            if(user===null){
                setError("user not found")
                return
            }
            setLoading(true)
            const response = await axios.get(`http://localhost:8080/account/getallaccount/${user.userId}`, { headers: { Authorization: `Bearer ${user.token}` } });
            setaccount(response.data);
            }catch(e){
                setError(e.message)
            }finally{
                setLoading(false)
            }
        }
        getdata()
        }, [])
    if(loading){
        return <p>your dashboard is loading...</p>
    }
    if(error){
        return <p>Something went wrong {error}</p>
    }
    // const handleBtn = async () =>{
    //     try{
    //         setshowCreateModal(true)
    //         const AccountCreatedResponse  = await axios.post(`http://localhost:8080/account/create`,{user.userId, accountType},{Authorization: `Bearer ${user.token}`})
    //         setAccountType(AccountCreatedResponse.data.accountType)
    //     }catch(er){
    //         setError(er.message)
    //     }finally{
    //         setshowCreateModal(false)
    //     }
    // }
    const handleOpenModal = () =>{
        setshowCreateModal(true)
    }
    const handleCreateAccount = async () =>{
        try{
            setaccount( ...account,await axios.post(`http://localhost:8080/account/create`,{accountType},{ headers:{Authorization: `Bearer ${user.token}`}}))
        }catch(err){
            setError(err.message);
        }finally{
            setshowCreateModal(false)
        }
    }
    return(
        <>
        <h1>welcome {user.name}</h1>{account.length===0?<p>You have no account yet. Please create one.</p>:<h1>Balance: {account[0].balance}</h1>}
        <button onClick={handleOpenModal}>+ New Account</button>
        {showCreateModal&&<select name="Accounttype" id="Accounttype">
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
        </select>}
        {showCreateModal?<button>Create</button>:<button>Cancel</button>}
        </>
    )
}