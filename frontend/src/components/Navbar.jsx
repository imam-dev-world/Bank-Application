import { AuthContext } from "../context/Authcontext"
import {useNavigate} from 'react-router-dom'
import { useContext } from "react"
export const Navbar = () =>{
    const navigate = useNavigate()
    const { setuser } = useContext(AuthContext)
    const handleLogout =()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")

        setuser(null)

        navigate("/login")
    }
    return <button onClick={handleLogout}>Logout</button>
}