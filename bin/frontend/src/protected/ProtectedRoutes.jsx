import { Navigate,Outlet  } from "react-router-dom"
import { AuthContext } from "../context/Authcontext"
import { useContext } from "react"

export const ProtectedRoutes = () =>{
    const {user} = useContext(AuthContext)
    if(user===null){
    return <Navigate to="/login" />
    }
    return <Outlet/>
}