import React, { useState, useEffect } from 'react'
import { getBooks } from '../services/api.js'

function StudentViewBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBooks()
        console.log('Books response:', data) // TEMPORARY: check real shape here
        setBooks(data)
      } catch (err) {
        setError('Failed to load books.')
        console.log('Get books error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) return <div className="content-page"><p>Loading books...</p></div>
  if (error) return <div className="content-page"><p className="neo-message">{error}</p></div>

  return (
    <div className="content-page">
      <h2>Available Books</h2>
      <ul className="neo-list">
        {books.map((book) => (
          <li key={book.book_id}>
            {book.title} by {book.author_name} —{' '}
            {book.available_copies > 0 ? 'Available' : 'Checked out'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentViewBooks