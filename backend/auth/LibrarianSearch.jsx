import React, { useState } from 'react'
import { deleteStudent } from '../services/api.js'

function DeleteStudent() {
  const [deleteId, setDeleteId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleDelete(e) {
    e.preventDefault()
    if (!deleteId) {
      setMessage('❌ Please enter a Student ID.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const data = await deleteStudent(Number(deleteId))
      console.log('Delete student response:', data)

      setMessage(`✅ Student ID ${deleteId} deleted successfully.`)
      setDeleteId('')
    } catch (err) {
      setMessage('❌ Failed to delete student. Please check the ID and try again.')
      console.log('Delete student error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="content-page">
      <h2>Delete Student</h2>
      <form onSubmit={handleDelete} className="neo-form">
        <div>
          <label>Student ID</label>
          <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        </div>
        {message && <p className="neo-message">{message}</p>}
        <button type="submit" className="neo-danger-btn" disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Student'}
        </button>
      </form>
    </div>
  )
}

export default DeleteStudent