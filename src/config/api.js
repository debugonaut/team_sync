export const API_URL = import.meta.env.PROD 
  ? '/api'  // Production: use relative path (same domain)
  : 'http://localhost:5001/api'  // Development: use local server

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
