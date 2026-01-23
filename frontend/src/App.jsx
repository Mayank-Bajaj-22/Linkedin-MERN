import React, { useContext } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { userDataContext } from './context/UserContext'
import Network from './pages/Network'
import Profile from './pages/Profile'

function App() {
  let { userData } = useContext(userDataContext)
  return (
    <div>
      <Routes>
        <Route path="/" element={ userData ? <Home /> : <Navigate to="/login" /> } />
        <Route path="/login" element={ userData ? <Navigate to="/" />  : <Login /> } />
        <Route path="/signup" element={ userData ? <Navigate to="/" /> : <SignUp /> } />
        <Route path="/network" element={ userData ? <Network /> : <Navigate to="/login" /> } />
        <Route path="/profile" element={ userData ? <Profile /> : <Navigate to="/login" /> } />
      </Routes>
    </div>
  )
}

export default App