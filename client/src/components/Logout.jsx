
import React from 'react'
import axios from 'axios'
const Logout = ({profile}) => {
  const handleLogout=async()=>{
    localStorage.clear()

    
    window.location.href="/"
    console.log("Logged Out")
  }
  return (
    <div>
      <button
        className="btn btn-outline-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Logout

