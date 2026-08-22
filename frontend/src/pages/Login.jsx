import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { loginUser } from '../services/api.js'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const data = await loginUser(email, password, role)
      console.log('Login response:', data)

      login({
        role: role,
        studentId: data.student_id,
        fullName: data.full_name,
        email: email,
      })

      if (role === 'student') {
        navigate('/student/dashboard')
      } else {
        navigate('/librarian/dashboard')
      }
    } catch (err) {
      setError('Login failed. Please check your email and password.')
      console.log('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  // TEMPORARY DEV-ONLY: bypasses real login so pages can be tested
  // without a working backend connection. Remove before real deployment.
  function handleDevSkip() {
    login({
      role: role,
      studentId: 1,
      fullName: role === 'student' ? 'Test Student' : 'Test Librarian',
      email: 'dev@test.com',
    })

    if (role === 'student') {
      navigate('/student/dashboard')
    } else {
      navigate('/librarian/dashboard')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Library Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Login as</label>
            <div className="role-toggle">
              <button
                type="button"
                className={role === 'student' ? 'active' : ''}
                onClick={() => setRole('student')}
              >
                Student
              </button>
              <button
                type="button"
                className={role === 'librarian' ? 'active' : ''}
                onClick={() => setRole('librarian')}
              >
                Librarian
              </button>
            </div>
          </div>
          {error && <p style={{ color: '#c0392b', fontSize: 13, padding: 0 }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* TEMPORARY DEV-ONLY BUTTON — remove before real deployment */}
        <button
          type="button"
          onClick={handleDevSkip}
          style={{
            marginTop: 12,
            width: '100%',
            background: 'transparent',
            border: '1px dashed #999',
            color: '#666',
            padding: 10,
            borderRadius: 10,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          Skip Login (Dev Only)
        </button>
      </div>
    </div>
  )
}

export default Login