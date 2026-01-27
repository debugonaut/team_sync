import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, Users, BarChart3, Settings, Bell, Search,
  TrendingUp, TrendingDown, Activity, UserCheck,
  MessageSquare, Award, Calendar, Filter, Trash2, Shield
} from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const [analytics, setAnalytics] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = 'http://localhost:5000/api'
  const token = localStorage.getItem('token')
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (!token || currentUser.role !== 'admin') {
      navigate('/login')
      return
    }
    fetchAnalytics()
    if (activeTab === 'users') {
      fetchUsers()
    }
  }, [activeTab])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/analytics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const data = await response.json()
      setAnalytics(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data.users)
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!response.ok) throw new Error('Failed to delete user')
      alert('User deleted successfully')
      fetchUsers()
      fetchAnalytics()
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      })
      if (!response.ok) throw new Error('Failed to update role')
      alert('Role updated successfully')
      fetchUsers()
      fetchAnalytics()
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-electric-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (error && !analytics) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button onClick={() => navigate('/login')} className="px-6 py-2 bg-electric-blue rounded-xl">
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Manage Users' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ]

  const stats = [
    { 
      label: 'Total Users', 
      value: analytics?.totalUsers || 0, 
      change: '+12%', 
      trend: 'up', 
      icon: Users,
      color: 'from-electric-blue to-neon-teal'
    },
    { 
      label: 'Total Students', 
      value: analytics?.totalStudents || 0, 
      change: '+8%', 
      trend: 'up', 
      icon: UserCheck,
      color: 'from-neon-purple to-electric-blue'
    },
    { 
      label: 'Total Admins', 
      value: analytics?.totalAdmins || 0, 
      change: '0%', 
      trend: 'up', 
      icon: Shield,
      color: 'from-neon-teal to-neon-purple'
    },
    { 
      label: 'Active Teams', 
      value: '0', 
      change: '+15%', 
      trend: 'up', 
      icon: Activity,
      color: 'from-yellow-400 to-orange-500'
    }
  ]

  const recentActivity = [
    { user: 'Alex Johnson', action: 'Posted a new doubt', subject: 'React', time: '2 min ago', status: 'pending' },
    { user: 'Priya Sharma', action: 'Solved a doubt', subject: 'Python', time: '5 min ago', status: 'completed' },
    { user: 'Rahul Kumar', action: 'Joined as mentor', subject: 'JavaScript', time: '10 min ago', status: 'approved' },
    { user: 'Sarah Wilson', action: 'Reported inappropriate content', subject: 'General', time: '15 min ago', status: 'review' },
    { user: 'Mike Chen', action: 'Earned "Problem Solver" badge', subject: 'Achievement', time: '20 min ago', status: 'completed' }
  ]

  const topMentors = [
    { name: 'Arjun Sharma', doubts: 234, rating: 4.9, status: 'online' },
    { name: 'Priya Patel', doubts: 189, rating: 4.8, status: 'online' },
    { name: 'Rohit Kumar', doubts: 156, rating: 4.7, status: 'offline' },
    { name: 'Sneha Gupta', doubts: 142, rating: 4.6, status: 'online' }
  ]

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Doubts Posted',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#00BFFF',
        backgroundColor: 'rgba(0, 191, 255, 0.1)',
        tension: 0.4
      },
      {
        label: 'Doubts Resolved',
        data: [45, 49, 60, 71, 46, 45, 35],
        borderColor: '#00E5A0',
        backgroundColor: 'rgba(0, 229, 160, 0.1)',
        tension: 0.4
      }
    ]
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-64 bg-dark-gray border-r border-gray-800 p-6"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-space font-bold gradient-text">Admin Panel</h1>
          <p className="text-sm text-gray-400 mt-1">Campus Diaries</p>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-electric-blue/20 to-neon-teal/20 text-electric-blue border border-electric-blue/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full text-left text-red-400 hover:text-red-300 transition-colors mb-2"
          >
            Logout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full text-left text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Main Site
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-dark-gray border-b border-gray-800 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-space font-bold">Dashboard Overview</h2>
              <p className="text-gray-400">Welcome back, Admin</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Logged in as</p>
                <p className="font-semibold">{currentUser.name}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center">
                <Shield size={20} />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass rounded-2xl p-6 hover:shadow-neon-blue/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl opacity-20`}>
                    <stat.icon size={24} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-space font-bold">Manage Users ({users.length})</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchUsers}
                  className="px-4 py-2 bg-electric-blue rounded-xl hover:bg-electric-blue/80 transition-colors"
                >
                  Refresh
                </motion.button>
              </div>

              <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Student ID</th>
                        <th className="text-left p-4">Role</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <motion.tr
                          key={user._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-t border-gray-800 hover:bg-gray-800/30"
                        >
                          <td className="p-4">{user.name}</td>
                          <td className="p-4 text-gray-400">{user.email}</td>
                          <td className="p-4 text-gray-400">{user.studentId}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin' 
                                ? 'bg-neon-purple/20 text-neon-purple' 
                                : 'bg-electric-blue/20 text-electric-blue'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateUserRole(user._id, user.role === 'admin' ? 'student' : 'admin')}
                                className="p-2 glass rounded-lg hover:bg-neon-purple/20 transition-colors"
                                title="Toggle Role"
                              >
                                <Shield size={16} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteUser(user._id)}
                                className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                                title="Delete User"
                              >
                                <Trash2 size={16} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-space font-bold">Recent Activity</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <Filter size={16} />
                  Filter
                </motion.button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ x: 4 }}
                    className="glass rounded-2xl p-4 hover:shadow-neon-blue/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center text-sm font-bold">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-sm text-gray-400">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium mb-1 ${
                          activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          activity.status === 'approved' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {activity.status}
                        </div>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Mentors */}
            <div>
              <h3 className="text-2xl font-space font-bold mb-6">Top Mentors</h3>
              <div className="space-y-4">
                {topMentors.map((mentor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-2xl p-4 hover:shadow-neon-purple/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-electric-blue rounded-full flex items-center justify-center text-sm font-bold">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-dark ${
                          mentor.status === 'online' ? 'bg-green-400' : 'bg-gray-500'
                        }`} />
                      </div>
                      <div>
                        <div className="font-semibold">{mentor.name}</div>
                        <div className="text-sm text-gray-400">{mentor.doubts} doubts solved</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <div className="text-yellow-400">★</div>
                        <span>{mentor.rating}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        mentor.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {mentor.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('users')}
                    className="w-full text-left p-3 glass rounded-xl hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="text-electric-blue" size={20} />
                      <span>Manage Users</span>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-3 glass rounded-xl hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="text-neon-teal" size={20} />
                      <span>Review Reports</span>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-3 glass rounded-xl hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="text-neon-purple" size={20} />
                      <span>Manage Badges</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  )
}

export default AdminDashboard