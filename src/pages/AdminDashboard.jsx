import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, Users, BarChart3, Settings, Bell, Search,
  TrendingUp, TrendingDown, Activity, UserCheck,
  MessageSquare, Award, Calendar, Filter
} from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Manage Users' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ]

  const stats = [
    { 
      label: 'Total Users', 
      value: '2,847', 
      change: '+12%', 
      trend: 'up', 
      icon: Users,
      color: 'from-electric-blue to-neon-teal'
    },
    { 
      label: 'Active Doubts', 
      value: '1,234', 
      change: '+8%', 
      trend: 'up', 
      icon: MessageSquare,
      color: 'from-neon-purple to-electric-blue'
    },
    { 
      label: 'Resolved Today', 
      value: '89', 
      change: '-3%', 
      trend: 'down', 
      icon: UserCheck,
      color: 'from-neon-teal to-neon-purple'
    },
    { 
      label: 'Response Time', 
      value: '2.3h', 
      change: '+15%', 
      trend: 'down', 
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users, doubts..."
                  className="bg-dark border border-gray-700 rounded-xl pl-12 pr-4 py-2 focus:border-electric-blue focus:outline-none transition-colors"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 glass rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <Bell size={20} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-teal rounded-full"></div>
              </motion.button>

              <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center">
                <Users size={20} />
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