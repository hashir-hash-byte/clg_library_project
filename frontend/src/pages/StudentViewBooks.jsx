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
        console.log('Books response:', data)
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

  if (loading) return <div className="content-page"><p className="neo-message">Loading books...</p></div>
  if (error) return <div className="content-page"><p className="neo-message">{error}</p></div>

  return (
    <div className="content-page">
      <h2>Available Books</h2>
      <div className="neo-table-wrap">
        <table className="neo-table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Book ID</th>
              <th>Shelf Location</th>
              <th>Copies Available</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.book_id}>
                <td>{book.title}</td>
                <td>{book.book_id}</td>
                <td>{book.shelf_location}</td>
                <td>
                  <span className={`neo-badge ${book.available_copies > 0 ? 'available' : 'unavailable'}`}>
                    {book.available_copies}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentViewBooks