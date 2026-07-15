import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import { Register } from './pages/register'
import { Login } from './pages/login'
import { Dashboard } from './pages/dashboard'
import { AuthProvider } from './context/Authcontext'
import { ProtectedRoutes } from './protected/ProtectedRoutes'
import {Navigate} from 'react-router-dom'
import { Transfer } from './pages/transfer'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <div>
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
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
