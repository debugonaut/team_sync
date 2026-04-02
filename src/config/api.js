import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export const API_URL = 'http://localhost:5000/api'

export const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const isAdmin = () => {
  const user = getCurrentUser()
  return user?.role === 'admin'
}

export const logout = async () => {
  try {
    await signOut(auth)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
