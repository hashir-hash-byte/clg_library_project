import React, { useState } from 'react'
import { registerStudent, deleteStudent } from '../services/api.js'

function RegisterStudent() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [deleteId, setDeleteId] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)

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

  async function handleDelete(e) {
    e.preventDefault()
    if (!deleteId) {
      setDeleteMessage('❌ Please enter a Student ID.')
      return
    }

    setDeleteLoading(true)
    setDeleteMessage('')

    try {
      const data = await deleteStudent(Number(deleteId))
      console.log('Delete student response:', data)

      setDeleteMessage(`✅ Student ID ${deleteId} deleted successfully.`)
      setDeleteId('')
    } catch (err) {
      setDeleteMessage('❌ Failed to delete student. Please check the ID and try again.')
      console.log('Delete student error:', err)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="content-page">
      <div className="neo-split">
        <div className="neo-split-panel">
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

        <div className="neo-split-panel">
          <h2>Delete Student</h2>
          <form onSubmit={handleDelete} className="neo-form">
            <div>
              <label>Student ID</label>
              <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
            </div>
            {deleteMessage && <p className="neo-message">{deleteMessage}</p>}
            <button type="submit" className="neo-danger-btn" disabled={deleteLoading}>
              {deleteLoading ? 'Deleting...' : 'Delete Student'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterStudent