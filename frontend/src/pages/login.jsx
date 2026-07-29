import styles from './login.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import { useState, useContext } from "react"
import { Link } from "react-router-dom";
export const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState({ field: "", message: "" })
    const [loading, setloading] = useState(false)
    const [errMessage, seterrMessage] = useState("");
    const navigate = useNavigate()
    const { setuser } = useContext(AuthContext)
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (email === "") {
            seterror({ field: "email", message: "enter valid email" });
            return;
        }
        if (password.length < 6) {
            seterror({ field: "password", message: "enter password atleast 6 character" });
            return;
        }
        try {
            setloading(true)
            const response = await axios.post("http://localhost:8080/auth/login", { email: email, password: password })
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("token", response.data.token);
            setuser(response.data)
            setloading(false)
            navigate("/dashboard")
        } catch (err) {
            setloading(false)
            seterrMessage(err.response.data.error)
        }
    }
    return (

        <div className={`d-flex flex-column justify-content-center align-items-center min-vh-100 ${styles.loginWrapper}`}>
            <div className={`d-flex flex-column justify-content-center align-items-center gap-3 bg-white text-black p-4 ${styles.loginBox}`}>
                <h4>Login to your account</h4>
                <div className='w-100'>
                    <input
                        className={`form-control`}
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />
                    {error.field === "email" && <p className="text-danger small mb-0">{error.message}</p>}
                </div>
                <div className='w-100'>
                    <input
                        className={`form-control`}
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                    />
                    {error.field === "password" && <p className="text-danger small mb-0">{error.message}</p>}
                </div>
                <button onClick={handleSubmit} className='btn btn-primary w-100 fw-semibold'> {loading ? "Please wait..." : "Submit"}</button>
                <nav>
                    Don't have an account? <Link to="/register" className='text-decoration-none '>Register here</Link>
                </nav>
                {errMessage && <p className="text-danger small">{errMessage}</p>}
            </div>
        </div>
    )
}