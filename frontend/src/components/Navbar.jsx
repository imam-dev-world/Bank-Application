    import userImage from "../assets/user.png";
    import style from "./navBar.module.css"
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
        return (
        <nav className={`d-flex justify-content-around align-items-center ${style.navContainer}` }>
            <div>🏦 Online Money</div>
            {/* <div className="nav-link">Dashboard</div>
            <div>Transfer</div>
            <div className="d-flex gap-3"><img src={userImage} alt="" className={`${style.userIcon}`}/>Welcome
            <button  className="btn btn-danger ps-3 pe-3 pt-2 pb-2">Logout</button>
            </div> */}
            <div className={`${style.centerContent}`}>
                <ul >
                    <li>Dashboard</li>
                    <li>Transfer</li>
                </ul>
            </div>
            <div className="d-flex gap-2 p-5">
                <img src={userImage} alt="" className={`${style.userIcon}`}/>Welcome
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
        )
    }