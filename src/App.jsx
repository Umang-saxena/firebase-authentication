import { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Admin from './components/Admin'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (

    <BrowserRouter>
        <AuthProvider>
      <div className="App">
        <Routes>
          {/* <Route path="/admin" element={<Admin />} /> */}
          <Route exact path="/" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
