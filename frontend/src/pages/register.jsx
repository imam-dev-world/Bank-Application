import styles from './register.module.css'
import axios from "axios";
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

export const Register = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");
    const [load, setload] = useState(false);
    const navi = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (name === "") {
                seterror("Enter valid name")
                return
            } if (email === "") {
                seterror("Enter valid email")
                return
            } if (password.length < 6) {
                seterror("Password must be atlease 6 character")
                return
            }
            setload(true)
            const resp = await axios.post("http://localhost:8080/auth/register", { name, email, password });
            setload(false)
            navi("/login")
        } catch (err) {
            setload(false)
            seterror(err.message);
        }
    }
    return (
        <div className={`d-flex flex-column justify-content-center align-items-center min-vh-100 ${styles.registerWrapper}`}>
            <div className={`d-flex flex-column justify-content-center align-items-center gap-3 bg-white text-black p-4 ${styles.registerBox}`}>
                <h4>Create your account</h4>
                <input
                    className={`form-control`}
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setname(e.target.value)}
                />
                <input
                    className={`form-control`}
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                />
                <input
                    className={`form-control`}
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                />

                <button onClick={handleSubmit} className='btn btn-primary w-100 fw-semibold'>{load ? "Please wait..." : "Submit"}</button>

                <nav>
                    Already having an account? <Link to="/login" className='text-decoration-none '>login here</Link>
                </nav>
                <p>{error}</p>
            </div>
        </div>
    )
}