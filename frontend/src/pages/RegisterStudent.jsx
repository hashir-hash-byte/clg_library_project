import React, { useState } from 'react'
import { registerStudent } from '../services/api.js'

function RegisterStudent() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!fullName || !email || !phone || !department || !password) {
      setMessage('❌ Please fill in all fields.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const data = await registerStudent(fullName, email, phone, department, password)
      console.log('Register response:', data)

      setMessage(`✅ Student "${fullName}" registered successfully.`)
      setFullName('')
      setEmail('')
      setPhone('')
      setDepartment('')
      setPassword('')
    } catch (err) {
      setMessage('❌ Registration failed. Please try again.')
      console.log('Register error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="content-page">
      <h2>Register Student</h2>
      <form onSubmit={handleSubmit} className="neo-form">
        <div>
          <label>Full Name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Department</label>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {message && <p className="neo-message">{message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register Student'}
        </button>
      </form>
    </div>
  )
}

export default RegisterStudent