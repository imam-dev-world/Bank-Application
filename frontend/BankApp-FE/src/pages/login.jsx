import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import { useState,useContext } from "react"
export const Login =()=>{
    const [email, setemail] = useState("")
    const [password,setpassword]=useState("")
    const [error,seterror]=useState("")
    const [loading,setloading]=useState(false)
    const navigate = useNavigate()
    const { setuser } = useContext(AuthContext)
    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(email===""){
            seterror("enter valid email");
            return;
        }
        if(password.length<6){
            seterror("enter password atleast 6 character");
            return;
        }
        try{
        setloading(true)
        const response = await axios.post("http://localhost:8080/auth/login",{email:email, password:password})
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        setuser(response.data)
        setloading(false)
        navigate("/dashboard")
        }catch(err){
            setloading(false)
            seterror(err.message)
        }
    }
    return(
        <>
        <h1>Login</h1>
        <input 
        id="email"
        type="email" 
         placeholder="Enter email" 
        value={email}
        onChange={e=>setemail(e.target.value)} 
        />
        <input 
        id="password"
        type="password" 
        placeholder="Enter password" 
        value={password}
        onChange={e=>setpassword(e.target.value)} 
        />

        <button onClick={handleSubmit}>{loading?"Please wait...":"Submit"}</button>

        <p>{error}</p>
        </>
    )
}