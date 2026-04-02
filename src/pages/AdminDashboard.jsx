import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, Users, BarChart3, Settings, Bell, Search,
  TrendingUp, TrendingDown, Activity, UserCheck,
  Filter, Trash2, Shield
} from 'lucide-react'
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy 
} from 'firebase/firestore'
import { db } from '../firebase'
import { logout } from '../config/api'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))

  // Analytics derived from users state
  const stats = [
    { 
      label: 'Total Users', 
      value: users.length, 
      change: '+100%', 
      trend: 'up', 
      icon: Users,
      color: 'from-electric-blue to-neon-teal'
    },
    { 
      label: 'Students', 
      value: users.filter(u => u.role === 'student').length, 
      change: '+100%', 
      trend: 'up', 
      icon: UserCheck,
      color: 'from-neon-purple to-electric-blue'
    },
    { 
      label: 'Admins', 
      value: users.filter(u => u.role === 'admin').length, 
      change: '0%', 
      trend: 'up', 
      icon: Shield,
      color: 'from-neon-teal to-neon-purple'
    },
    { 
      label: 'New Today', 
      value: users.filter(u => new Date(u.createdAt).toDateString() === new Date().toDateString()).length, 
      change: '+15%', 
      trend: 'up', 
      icon: Activity,
      color: 'from-yellow-400 to-orange-500'
    }
  ]

  useEffect(() => {
    if (!currentUser.uid || currentUser.role !== 'admin') {
      navigate('/login')
      return
    }

    // Real-time listener for users
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setUsers(usersData)
      setLoading(false)
    }, (err) => {
      console.error('Firestore Error:', err)
      setError('Failed to sync with user database')
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? (This only removes their record from Firestore, not their Auth account.)')) return
    try {
      await deleteDoc(doc(db, 'users', userId))
      alert('User record deleted successfully')
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const updateUserRole = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole })
      alert(`Role updated to ${newRole}`)
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleLogout = async () => {
    await logout()
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

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Manage Users' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ]

  const recentActivity = [
    { user: 'Alex Johnson', action: 'Posted a new doubt', subject: 'React', time: '2 min ago', status: 'pending' },
    { user: 'Priya Sharma', action: 'Solved a doubt', subject: 'Python', time: '5 min ago', status: 'completed' }
  ]

  const topMentors = [
    { name: 'Arjun Sharma', doubts: 234, rating: 4.9, status: 'online' },
    { name: 'Priya Patel', doubts: 189, rating: 4.8, status: 'online' }
  ]

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
          <p className="text-sm text-gray-400 mt-1">Teamsync - MITAOE</p>
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
              <p className="text-gray-400">Welcome, {currentUser.name}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400 font-medium">Administrator</p>
                <div className="flex items-center gap-2 text-neon-teal text-xs">
                  <div className="w-2 h-2 rounded-full bg-neon-teal animate-pulse" />
                  Live Sync On
                </div>
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
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -4 }}
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
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="mb-8">
              <h3 className="text-2xl font-space font-bold mb-6">User Database</h3>

              <div className="glass rounded-2xl overflow-hidden border border-gray-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/80">
                      <tr>
                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Student Name</th>
                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</th>
                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">PRN</th>
                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Current Role</th>
                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-t border-gray-800 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4 font-medium">{user.name}</td>
                          <td className="p-4 text-gray-400 text-sm">{user.email}</td>
                          <td className="p-4 text-gray-400 text-sm">{user.studentId}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ring-1 ${
                              user.role === 'admin' 
                                ? 'bg-neon-purple/10 text-neon-purple ring-neon-purple/30' 
                                : 'bg-electric-blue/10 text-electric-blue ring-electric-blue/30'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateUserRole(user.id, user.role === 'admin' ? 'student' : 'admin')}
                                className="p-2 glass rounded-lg hover:bg-neon-purple/20 transition-colors text-neon-purple"
                                title={user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                              >
                                <Shield size={16} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteUser(user.id)}
                                className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                                title="Delete Record"
                              >
                                <Trash2 size={16} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-gray-500 italic">No users found in database</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'users' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-space font-bold">Recent Platform Activity</h3>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass rounded-2xl p-4 hover:shadow-neon-blue/10 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{activity.user}</p>
                            <p className="text-sm text-gray-400">{activity.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-electric-blue mb-1 font-medium">{activity.time}</div>
                          <p className="text-xs text-gray-500">subject: {activity.subject}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Top Mentors */}
              <div>
                <h3 className="text-1xl font-space font-bold mb-6">Active Mentors</h3>
                <div className="space-y-4">
                  {topMentors.map((mentor, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="glass rounded-2xl p-4 border border-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{mentor.name}</div>
                          <div className="text-xs text-gray-500">{mentor.doubts} solutions</div>
                        </div>
                        <div className="text-yellow-400 font-bold text-sm">★ {mentor.rating}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.main>
      </div>
    </div>
  )
}

export default AdminDashboard