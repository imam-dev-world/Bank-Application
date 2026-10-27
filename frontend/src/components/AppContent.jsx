import { useLocation,Routes, Route } from "react-router-dom";
import { Register } from '../pages/register'
import { Login } from '../pages/login'
import { Dashboard } from '../pages/dashboard'
import { AuthContext } from '../context/Authcontext'
import { ProtectedRoutes } from '../protected/ProtectedRoutes'
import { Navigate } from 'react-router-dom'
import { Transfer } from '../pages/transfer'
import { Navbar } from '../components/Navbar'
import { useContext } from 'react'
export const AppContent = () =>{
    const {user} = useContext(AuthContext);
    const location = useLocation();

    return(
    <div>
    {user && location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route  path='/register' element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route element={<ProtectedRoutes/>}>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path='/transfer' element={<Transfer/>}/>
      </Route>
    </Routes>
    </div>
    )
}