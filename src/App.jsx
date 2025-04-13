import { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Admin from './components/Admin'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      
    </>
  )
}

export default App
