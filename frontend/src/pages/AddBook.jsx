import React, { useState } from 'react'
import { addBookAdmin, deleteBook } from '../services/api.js'

function AddBook() {
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [publisherId, setPublisherId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [totalCopies, setTotalCopies] = useState('')
  const [availableCopies, setAvailableCopies] = useState('')
  const [shelfLocation, setShelfLocation] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [deleteId, setDeleteId] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title || !isbn || !authorId || !publisherId || !categoryId || !totalCopies || !availableCopies || !shelfLocation) {
      setMessage('❌ Please fill in all fields.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const data = await addBookAdmin(
        title,
        isbn,
        Number(authorId),
        Number(publisherId),
        Number(categoryId),
        Number(totalCopies),
        Number(availableCopies),
        shelfLocation
      )
      console.log('Add book response:', data)

      setMessage(`✅ "${title}" added successfully.`)
      setTitle('')
      setIsbn('')
      setAuthorId('')
      setPublisherId('')
      setCategoryId('')
      setTotalCopies('')
      setAvailableCopies('')
      setShelfLocation('')
    } catch (err) {
      setMessage('❌ Failed to add book. Please try again.')
      console.log('Add book error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (!deleteId) {
      setDeleteMessage('❌ Please enter a Book ID.')
      return
    }

    setDeleteLoading(true)
    setDeleteMessage('')

    try {
      const data = await deleteBook(Number(deleteId))
      console.log('Delete book response:', data)

      setDeleteMessage(`✅ Book ID ${deleteId} deleted successfully.`)
      setDeleteId('')
    } catch (err) {
      setDeleteMessage('❌ Failed to delete book. Please check the ID and try again.')
      console.log('Delete book error:', err)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="content-page">
      <div className="neo-split">
        <div className="neo-split-panel">
          <h2>Add New Book</h2>
          <form onSubmit={handleSubmit} className="neo-form">
            <div>
              <label>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label>ISBN</label>
              <input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
            </div>
            <div>
              <label>Author ID</label>
              <input value={authorId} onChange={(e) => setAuthorId(e.target.value)} />
            </div>
            <div>
              <label>Publisher ID</label>
              <input value={publisherId} onChange={(e) => setPublisherId(e.target.value)} />
            </div>
            <div>
              <label>Category ID</label>
              <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
            </div>
            <div>
              <label>Total Copies</label>
              <input value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} />
            </div>
            <div>
              <label>Available Copies</label>
              <input value={availableCopies} onChange={(e) => setAvailableCopies(e.target.value)} />
            </div>
            <div>
              <label>Shelf Location</label>
              <input value={shelfLocation} onChange={(e) => setShelfLocation(e.target.value)} />
            </div>
            {message && <p className="neo-message">{message}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </form>
        </div>

        <div className="neo-split-panel">
          <h2>Delete Book</h2>
          <form onSubmit={handleDelete} className="neo-form">
            <div>
              <label>Book ID</label>
              <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
            </div>
            {deleteMessage && <p className="neo-message">{deleteMessage}</p>}
            <button type="submit" className="neo-danger-btn" disabled={deleteLoading}>
              {deleteLoading ? 'Deleting...' : 'Delete Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBook