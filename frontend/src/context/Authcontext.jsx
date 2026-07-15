import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setuser] = useState(JSON.parse(localStorage.getItem("user")))
    
    return (
        <AuthContext.Provider value={{user,setuser}}>{children}</AuthContext.Provider>
    )
}