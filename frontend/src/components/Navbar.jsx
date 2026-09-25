    import userImage from "../assets/user.png";
    import style from "./navBar.module.css"
    import { AuthContext } from "../context/Authcontext"
    import {useNavigate,NavLink} from 'react-router-dom'
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
        return (
        <nav className={`d-flex justify-content-around align-items-center ${style.navContainer}` }>
            <div className="fs-4 fw-bold"> 
                🏦 Online Money
            </div>
            
            <div >
                <ul className="d-flex gap-5 list-unstyled">
                    <li className="mt-3"><NavLink to="/dashboard" className={({ isActive }) => isActive ?`${style.activeState} text-decoration-none`:"text-decoration-none text-reset"}>Dashboard</NavLink> </li> 
                    <li className="mt-3"><NavLink to="/transfer" className={({ isActive }) => isActive ?
                    `${style.activeState} text-decoration-none`:"text-decoration-none text-reset"}>Transfer</NavLink></li>
                </ul>
            </div>

            <div className="d-flex gap-2">
                <img src={userImage} alt="" className={`${style.userIcon}  `}/>Welcome
                <button className="ms-4" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
        )
    }