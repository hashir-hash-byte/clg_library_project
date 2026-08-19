import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
})

// ---- LOGIN ----
export async function loginUser(email, password, role) {
  const response = await api.post('/auth/login', {
    email,
    password,
    user_type: role,
  })
  return response.data
}

// ---- REGISTER STUDENT ----
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