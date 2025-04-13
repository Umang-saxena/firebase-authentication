import React ,{useState} from 'react'
import {Card,Button,Alert} from 'react-bootstrap'
import {useAuth} from "../contexts/AuthContext.jsx"
import { useNavigate } from 'react-router-dom'

function Admin() {

  const [error, setError] = useState(null);
  const navigate = useNavigate()
  
  const {currentUser,logout} = useAuth();


  async function handleLogout() {
    // Handle logout logic here
    setError("");
    try {
      // Call the logout function from AuthContext
      await logout()
      navigate("/login")
    }
    catch (error) {
      console.log(error.message)
      setError("Failed to log out")
    }
    
  }


  return (
    <>
      <Card className="text-center">
        <Card.Body>

          <Card.Title>Admin Dashboard</Card.Title>
          <Card.Text>
            This is the admin dashboard. You can manage users and settings from here.
          </Card.Text>

          <h2 className="text-center mb-4"> Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong> Email :{currentUser.email}</strong>
        </Card.Body>


      </Card>
      <div className="text-center mt-3">
        <Button variant="link" onClick={handleLogout} >Logout</Button>
        </div>
    
    </>
  )
}

export default Admin