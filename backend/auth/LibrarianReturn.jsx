import React, { useState } from 'react'
import { deleteBook } from '../services/api.js'

function DeleteBook() {
  const [deleteId, setDeleteId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleDelete(e) {
    e.preventDefault()
    if (!deleteId) {
      setMessage('❌ Please enter a Book ID.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const data = await deleteBook(Number(deleteId))
      console.log('Delete book response:', data)

      setMessage(`✅ Book ID ${deleteId} deleted successfully.`)
      setDeleteId('')
    } catch (err) {
      setMessage('❌ Failed to delete book. Please check the ID and try again.')
      console.log('Delete book error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="content-page">
      <h2>Delete Book</h2>
      <form onSubmit={handleDelete} className="neo-form">
        <div>
          <label>Book ID</label>
          <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        </div>
        {message && <p className="neo-message">{message}</p>}
        <button type="submit" className="neo-danger-btn" disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Book'}
        </button>
      </form>
    </div>
  )
}

export default DeleteBook