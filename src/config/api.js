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

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
