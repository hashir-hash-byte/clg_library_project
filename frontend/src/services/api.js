import axios from 'axios'

const api = axios.create({
baseURL: 'https://clinic-paycheck-taco.ngrok-free.dev',
})

// ---- AUTH ----
export async function loginUser(email, password, role) {
  const response = await api.post('/auth/login', {
    email,
    password,
    user_type: role,
  })
  return response.data
}

// ---- STUDENTS ----
export async function registerStudent(fullName, email, phone, department, password) {
  const response = await api.post('/students', {
    full_name: fullName,
    email,
    phone,
    department,
    password_hash: password,
  })
  return response.data
}

export async function getStudents() {
  const response = await api.get('/students')
  return response.data
}

export async function getStudent(studentId) {
  const response = await api.get(`/students/${studentId}`)
  return response.data
}

export async function updateStudent(studentId, fullName, email, phone, department, password) {
  const response = await api.put(`/students/${studentId}`, {
    full_name: fullName,
    email,
    phone,
    department,
    password_hash: password,
  })
  return response.data
}

export async function deleteStudent(studentId) {
  const response = await api.delete(`/students/${studentId}`)
  return response.data
}

// ---- BOOKS ----
export async function getBooks() {
  const response = await api.get('/books')
  return response.data
}

export async function getBook(bookId) {
  const response = await api.get(`/books/${bookId}`)
  return response.data
}

export async function createBook(title, authorId, isbn, totalCopies, availableCopies) {
  const response = await api.post('/books', {
    title,
    author_ID: authorId, // NOTE: backend uses capital ID here specifically
    isbn,
    total_copies: totalCopies,
    available_copies: availableCopies,
  })
  return response.data
}

export async function updateBook(bookId, title, authorId, isbn, totalCopies, availableCopies) {
  const response = await api.put(`/books/${bookId}`, {
    title,
    author_ID: authorId,
    isbn,
    total_copies: totalCopies,
    available_copies: availableCopies,
  })
  return response.data
}

export async function deleteBook(bookId) {
  const response = await api.delete(`/books/${bookId}`)
  return response.data
}

// ---- ADMIN: ADD BOOK (different, fuller endpoint) ----
export async function addBookAdmin(title, isbn, authorId, publisherId, categoryId, totalCopies, availableCopies, shelfLocation) {
  const response = await api.post('/admin/books', {
    title,
    isbn,
    author_id: authorId, // NOTE: lowercase id here, unlike /books above
    publisher_id: publisherId,
    category_id: categoryId,
    total_copies: totalCopies,
    available_copies: availableCopies,
    shelf_location: shelfLocation,
  })
  return response.data
}

// ---- BORROW / RETURN / FINE ----
export async function borrowBook(studentId, bookId) {
  const response = await api.post('/borrow', {
    student_id: studentId,
    book_id: bookId,
  })
  return response.data
}

export async function returnBook(studentId, bookId) {
  const response = await api.post('/return', {
    student_id: studentId,
    book_id: bookId,
  })
  return response.data
}

export async function calculateFine(studentId, bookId) {
  const response = await api.post('/fine', {
    student_id: studentId,
    book_id: bookId,
  })
  return response.data
}

// ---- SEARCH ----
export async function searchBooks(keyword) {
  const response = await api.get('/search/books', {
    params: { keyword },
  })
  return response.data
}

// ---- REPORTS ----
export async function getReports() {
  const response = await api.get('/reports')
  return response.data
}