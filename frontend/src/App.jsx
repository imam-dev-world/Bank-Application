import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import './App.css'
import { Register } from './pages/register'
import { Login } from './pages/login'
import { Dashboard } from './pages/dashboard'
import { AuthContext, AuthProvider } from './context/Authcontext'
import { ProtectedRoutes } from './protected/ProtectedRoutes'
import { Navigate } from 'react-router-dom'
import { Transfer } from './pages/transfer'
import { Navbar } from './components/Navbar'
import { useContext } from 'react'
import { AppContent } from './components/AppContent'

function App() {
 
  
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  )
}

export default App
