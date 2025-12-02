import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Edit, Camera, Award, TrendingUp, 
  MessageCircle, ThumbsUp, Calendar, MapPin, 
  Mail, Github, Linkedin, Moon, Sun, Settings,
  Star, Target, Zap, BarChart3
} from 'lucide-react'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Harsh Khatri',
    bio: 'Computer Science student passionate about web development and AI. Love helping fellow students solve coding challenges!',
    college: 'MITAOE',
    location: 'Alandi, Pune',
    email: 'harsh.khatri@mitaoe.ac.in',
    joinDate: 'January 2025',
    github: 'harshkhatri',
    linkedin: 'harsh-khatri'
  })

  const stats = [
    { label: 'Projects Completed', value: 12, icon: Target, color: 'text-electric-blue' },
    { label: 'Team Rating', value: '4.8', icon: Star, color: 'text-yellow-400' },
    { label: 'Total Credits', value: 2340, icon: Zap, color: 'text-neon-purple' },
    { label: 'Contributions', value: 156, icon: MessageCircle, color: 'text-neon-teal' }
  ]

  const performanceData = [
    { skill: 'Communication', value: 85, color: 'from-electric-blue to-neon-teal' },
    { skill: 'Technical Skills', value: 92, color: 'from-neon-purple to-electric-blue' },
    { skill: 'Team Collaboration', value: 88, color: 'from-neon-teal to-neon-purple' },
    { skill: 'Problem Solving', value: 90, color: 'from-electric-blue to-neon-purple' },
    { skill: 'Leadership', value: 78, color: 'from-neon-purple to-neon-teal' }
  ]

  const creditHistory = [
    { month: 'Jan', earned: 180, spent: 50 },
    { month: 'Feb', earned: 220, spent: 80 },
    { month: 'Mar', earned: 280, spent: 120 },
    { month: 'Apr', earned: 320, spent: 100 },
    { month: 'May', earned: 380, spent: 150 },
    { month: 'Jun', earned: 420, spent: 180 }
  ]

  const badges = [
    { name: 'Problem Solver', description: 'Solved 100+ doubts', color: 'from-electric-blue to-neon-teal', earned: true },
    { name: 'Helpful Mentor', description: 'Received 50+ upvotes', color: 'from-neon-purple to-electric-blue', earned: true },
    { name: 'Quick Responder', description: 'Average response time < 2 hours', color: 'from-neon-teal to-neon-purple', earned: true },
    { name: 'Code Master', description: 'Expert in 5+ programming languages', color: 'from-yellow-400 to-orange-500', earned: false },
    { name: 'Community Leader', description: 'Top 10% contributor this month', color: 'from-pink-500 to-purple-600', earned: false },
    { name: 'Hackathon Hero', description: 'Participated in 10+ hackathons', color: 'from-green-400 to-blue-500', earned: false }
  ]

  const recentActivity = [
    { type: 'project', content: 'Completed AI Study Assistant project', time: '2 hours ago', credits: '+150' },
    { type: 'rating', content: 'Received 5-star rating from team', time: '5 hours ago', credits: '+50' },
    { type: 'badge', content: 'Earned "Team Player" badge', time: '1 day ago', credits: '+100' },
    { type: 'contribution', content: 'Contributed to campus hackathon', time: '2 days ago', credits: '+200' }
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic here
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-dark-gray border-b border-gray-800 p-4"
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <h1 className="text-2xl font-space font-bold">Profile</h1>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
            >
              <Settings size={20} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 via-transparent to-neon-purple/10" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center text-4xl font-bold cursor-pointer"
                >
                  HK
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-2 right-2 p-2 bg-dark-gray rounded-full border border-gray-600 hover:border-electric-blue transition-colors"
                >
                  <Camera size={16} />
                </motion.button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="text-3xl font-space font-bold bg-transparent border-b border-electric-blue focus:outline-none mb-2"
                      />
                    ) : (
                      <h2 className="text-3xl font-space font-bold mb-2">{profile.name}</h2>
                    )}
                    <div className="flex items-center gap-4 text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.college}
                            onChange={(e) => setProfile({...profile, college: e.target.value})}
                            className="bg-transparent border-b border-gray-600 focus:border-electric-blue focus:outline-none"
                          />
                        ) : (
                          <span>{profile.college}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>Joined {profile.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-electric-blue to-neon-teal rounded-xl hover:shadow-neon-blue transition-all duration-300"
                  >
                    <Edit size={16} />
                    {isEditing ? 'Save' : 'Edit Profile'}
                  </motion.button>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full bg-dark-gray border border-gray-700 rounded-xl p-3 focus:border-electric-blue focus:outline-none resize-none"
                      rows="3"
                    />
                  ) : (
                    <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <motion.a
                    whileHover={{ scale: 1.1, color: "#00BFFF" }}
                    href={`mailto:${profile.email}`}
                    className="text-gray-400 hover:text-electric-blue transition-colors"
                  >
                    <Mail size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, color: "#8A2BE2" }}
                    href={`https://github.com/${profile.github}`}
                    className="text-gray-400 hover:text-neon-purple transition-colors"
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, color: "#00E5A0" }}
                    href={`https://linkedin.com/in/${profile.linkedin}`}
                    className="text-gray-400 hover:text-neon-teal transition-colors"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Level 12</span>
                <span className="text-sm text-gray-400">2,340 / 2,500 XP</span>
              </div>
              <div className="w-full bg-dark-gray rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '93.6%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-electric-blue to-neon-teal h-3 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-space font-bold mb-6">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass rounded-2xl p-4 text-center hover:shadow-neon-blue/10 transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-xl mb-3 ${stat.color.replace('text-', 'bg-')}/20`}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Performance Chart */}
            <h3 className="text-2xl font-space font-bold mb-6 flex items-center gap-2">
              <BarChart3 size={24} />
              Performance Analysis
            </h3>
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{item.skill}</span>
                      <span className="text-sm font-bold text-electric-blue">{item.value}%</span>
                    </div>
                    <div className="w-full bg-dark-gray rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`bg-gradient-to-r ${item.color} h-2 rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credits Chart */}
            <h3 className="text-2xl font-space font-bold mb-6 flex items-center gap-2">
              <Zap size={24} className="text-neon-purple" />
              Credits Overview
            </h3>
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="flex items-end justify-between h-48 gap-2">
                {creditHistory.map((month, index) => {
                  const maxValue = Math.max(...creditHistory.map(m => m.earned))
                  const earnedHeight = (month.earned / maxValue) * 100
                  const spentHeight = (month.spent / maxValue) * 100
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex gap-1 items-end h-40">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${earnedHeight}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex-1 bg-gradient-to-t from-electric-blue to-neon-teal rounded-t"
                          title={`Earned: ${month.earned}`}
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${spentHeight}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                          className="flex-1 bg-gradient-to-t from-neon-purple to-pink-500 rounded-t opacity-60"
                          title={`Spent: ${month.spent}`}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{month.month}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-electric-blue to-neon-teal rounded" />
                  <span className="text-sm text-gray-400">Earned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-neon-purple to-pink-500 rounded opacity-60" />
                  <span className="text-sm text-gray-400">Spent</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <h3 className="text-2xl font-space font-bold mb-6">Recent Activity</h3>
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
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'project' ? 'bg-green-400' :
                        activity.type === 'rating' ? 'bg-yellow-400' :
                        activity.type === 'badge' ? 'bg-neon-purple' :
                        'bg-electric-blue'
                      }`} />
                      <div className="flex-1">
                        <p className="text-gray-300">{activity.content}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <span className="text-neon-teal font-semibold">{activity.credits}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-2xl font-space font-bold mb-6">Achievements</h3>
            <div className="space-y-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className={`glass rounded-2xl p-4 transition-all duration-300 ${
                    badge.earned ? 'hover:shadow-neon-blue/10' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 bg-gradient-to-r ${badge.color} rounded-xl flex items-center justify-center`}>
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-sm text-gray-400">{badge.description}</p>
                    </div>
                  </div>
                  {badge.earned && (
                    <div className="text-xs text-green-400 font-medium">✓ Earned</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage