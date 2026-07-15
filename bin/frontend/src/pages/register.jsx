import axios from "axios";
import { useState } from "react"
import {useNavigate} from 'react-router-dom'

export const Register = () =>{
    const [name, setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState("");
    const [load,setload]=useState(false);
    const navi = useNavigate();
    const handleSubmit = async (event) =>{
        event.preventDefault()
    try{
        if(name===""){
            seterror("Enter valid name")
            return
        }if(email===""){
            seterror("Enter valid email")
            return
        }if(password.length<6){
            seterror("Password must be atlease 6 character")
            return
        }
        setload(true)
        const resp= await axios.post("http://localhost:8080/auth/register",{ name, email, password });
        setload(false)
        navi("/Login")
    }catch(err){
        setload(false)
        seterror(err.message);
    }
}
    return(
        <>
        <h1>Login</h1>
        <input 
        id="name"
        type="text" 
        placeholder="Enter name" 
        value={name}
        onChange={e=>setname(e.target.value)} 
        />
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

        <button onClick={handleSubmit}>{load?"Please wait...":"Submit"}</button>
        <p>{error}</p>
        </>
    )
}