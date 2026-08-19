import React, { useState } from 'react'

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

  function handleSubmit(e) {
    e.preventDefault()
    if (!title || !isbn || !authorId || !publisherId || !categoryId || !totalCopies || !availableCopies || !shelfLocation) {
      setMessage('❌ Please fill in all fields.')
      return
    }
    setMessage(`✅ "${title}" added (not yet saved to backend).`)
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
        <button type="submit">Add Book</button>
      </form>
      {message && <p className="neo-message">{message}</p>}
    </div>
  )
}

export default AddBook