import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({Children}) => {
    const navigate=useNavigate()
    useEffect(() => {
        const token=JSON.parse(localStorage.getItem('profile'))
        if(!token){
            navigate("/")
        }
    }, [navigate])
    
  return (
    <div>
      <Children/>
    </div>
  )
}

export default ProtectedRoute
