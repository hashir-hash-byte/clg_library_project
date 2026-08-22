import React, { useState } from 'react'
import { addBookAdmin } from '../services/api.js'

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
      console.log('Add book response:', data) // TEMPORARY: check real shape here

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

  return (
    <div className="content-page">
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
  )
}

export default AddBook