import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute