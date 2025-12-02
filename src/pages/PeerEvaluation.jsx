import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Star, MessageSquare, CheckCircle, Clock, TrendingUp, Award, BarChart3, Users, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PeerEvaluation = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pending')
  const [selectedMember, setSelectedMember] = useState(null)
  const [ratings, setRatings] = useState({})
  const [anonymousMode, setAnonymousMode] = useState(true)
  const [selectedTimeline, setSelectedTimeline] = useState('sprint')
  const [teamFeedback, setTeamFeedback] = useState('')

  const evaluations = [
    {
      id: 1,
      project: "Smart Campus IoT System",
      member: "Harsh Khatri",
      role: "Frontend Developer",
      status: "pending",
      deadline: "Dec 18, 2024"
    },
    {
      id: 2,
      project: "AI Study Assistant",
      member: "Aadesh Khande",
      role: "UI/UX Designer",
      status: "completed",
      deadline: "Dec 15, 2024",
      rating: 4.5
    },
    {
      id: 3,
      project: "E-commerce Mobile App",
      member: "Prajwal Kate",
      role: "Backend Developer",
      status: "pending",
      deadline: "Dec 20, 2024"
    },
    {
      id: 4,
      project: "Data Analytics Dashboard",
      member: "Nupoor Deshphande",
      role: "Research Analyst",
      status: "pending",
      deadline: "Dec 22, 2024"
    },
    {
      id: 5,
      project: "Campus Security System",
      member: "Kavya Reddy",
      role: "Security Analyst",
      status: "completed",
      deadline: "Dec 10, 2024",
      rating: 4.8
    },
    {
      id: 6,
      project: "Social Media Campaign",
      member: "Vikram Singh",
      role: "Marketing Lead",
      status: "completed",
      deadline: "Dec 12, 2024",
      rating: 4.2
    },
    {
      id: 7,
      project: "Cloud Infrastructure Setup",
      member: "Ananya Joshi",
      role: "DevOps Engineer",
      status: "pending",
      deadline: "Dec 25, 2024"
    }
  ]

  const criteria = [
    { id: 'communication', label: 'Communication', weight: 20 },
    { id: 'technical', label: 'Technical Skills', weight: 30 },
    { id: 'collaboration', label: 'Team Collaboration', weight: 25 },
    { id: 'reliability', label: 'Reliability', weight: 15 },
    { id: 'creativity', label: 'Creativity & Innovation', weight: 10 }
  ]

  const streakData = {
    currentStreak: 12,
    longestStreak: 18,
    totalEvaluations: 45,
    weeklyGoal: 3
  }

  const skillGrowthData = {
    communication: [3.2, 3.5, 3.8, 4.1, 4.3, 4.5],
    technical: [3.8, 4.0, 4.2, 4.4, 4.6, 4.7],
    collaboration: [3.5, 3.7, 4.0, 4.2, 4.4, 4.6],
    reliability: [4.0, 4.1, 4.3, 4.4, 4.5, 4.7],
    creativity: [3.0, 3.3, 3.6, 3.9, 4.1, 4.3]
  }

  const teamMembers = [
    { id: 1, name: 'Harsh Khatri', role: 'Frontend Dev', avatar: 'AS' },
    { id: 2, name: 'Aadesh Khande', role: 'UI/UX Designer', avatar: 'PP' },
    { id: 3, name: 'Prajwal Kate', role: 'backend Dev', avatar: 'RM' },
    { id: 4, name: 'Nupoor Deshphande', role: 'Research Analyst', avatar: 'SK' }
  ]

  const handleRating = (criteriaId, rating) => {
    setRatings(prev => ({
      ...prev,
      [criteriaId]: rating
    }))
  }

  const handleSubmitTeamFeedback = () => {
    const hasRatings = Object.keys(ratings).some(key => ratings[key] > 0)
    if (!hasRatings) {
      alert('Please provide at least one rating before submitting.')
      return
    }
    alert(`${anonymousMode ? 'Anonymous' : ''} Team feedback submitted successfully for ${selectedTimeline}!`)
    setRatings({})
    setTeamFeedback('')
  }

  const StarRating = ({ rating, onRate, readonly = false }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={!readonly ? { scale: 1.1 } : {}}
            whileTap={!readonly ? { scale: 0.9 } : {}}
            onClick={() => !readonly && onRate(star)}
            className={`${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-600'
            } ${!readonly ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Star size={20} />
          </motion.button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-dark-gray border-b border-gray-800 p-6"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/dashboard')}
              className="p-2 glass rounded-xl"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className="text-2xl font-space font-bold gradient-text">Peer Evaluation</h1>
              <p className="text-gray-400">Provide structured feedback to improve teamwork</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                activeTab === 'pending' 
                  ? 'bg-electric-blue text-white' 
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              Pending
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                activeTab === 'completed' 
                  ? 'bg-electric-blue text-white' 
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              Completed
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-electric-blue text-white' 
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              Analytics
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('team-rating')}
              className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                activeTab === 'team-rating' 
                  ? 'bg-electric-blue text-white' 
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              Team Rating
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'analytics' ? (
          <div className="space-y-6">
            {/* Streak Counter */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <Award className="mx-auto mb-3 text-yellow-400" size={32} />
                <h3 className="text-2xl font-bold text-white">{streakData.currentStreak}</h3>
                <p className="text-gray-400 text-sm">Current Streak</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <TrendingUp className="mx-auto mb-3 text-green-400" size={32} />
                <h3 className="text-2xl font-bold text-white">{streakData.longestStreak}</h3>
                <p className="text-gray-400 text-sm">Longest Streak</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <CheckCircle className="mx-auto mb-3 text-blue-400" size={32} />
                <h3 className="text-2xl font-bold text-white">{streakData.totalEvaluations}</h3>
                <p className="text-gray-400 text-sm">Total Reviews</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <Calendar className="mx-auto mb-3 text-purple-400" size={32} />
                <h3 className="text-2xl font-bold text-white">{streakData.weeklyGoal}</h3>
                <p className="text-gray-400 text-sm">Weekly Goal</p>
              </motion.div>
            </div>

            {/* Skill Growth Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 size={24} />
                Skill Growth Over Time
              </h3>
              <div className="space-y-6">
                {criteria.map((criterion, index) => {
                  const data = skillGrowthData[criterion.id]
                  const currentValue = data[data.length - 1]
                  const previousValue = data[data.length - 2]
                  const growth = ((currentValue - previousValue) / previousValue * 100).toFixed(1)
                  
                  return (
                    <div key={criterion.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{criterion.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{currentValue}/5</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            growth > 0 ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {growth > 0 ? '+' : ''}{growth}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 h-8">
                        {data.map((value, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${(value / 5) * 100}%` }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                            className="flex-1 bg-gradient-to-t from-electric-blue to-neon-teal rounded-sm min-h-[4px]"
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        ) : activeTab === 'team-rating' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Anonymous Team Rating</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={anonymousMode}
                    onChange={(e) => setAnonymousMode(e.target.checked)}
                    className="rounded"
                  />
                  Anonymous Mode
                </label>
                <select
                  value={selectedTimeline}
                  onChange={(e) => setSelectedTimeline(e.target.value)}
                  className="glass rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="sprint" className="bg-gray-800">Current Sprint</option>
                  <option value="week" className="bg-gray-800">This Week</option>
                  <option value="month" className="bg-gray-800">This Month</option>
                </select>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users size={20} />
                How's the team doing?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Rate your team's overall performance during the {selectedTimeline}. Your feedback is {anonymousMode ? 'anonymous' : 'attributed to you'}.
              </p>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <StarRating 
                      rating={ratings.teamOverall || 0}
                      onRate={(rating) => handleRating('teamOverall', rating)}
                    />
                  </div>
                  <p className="text-gray-400 text-sm">Overall Team Performance</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teamMembers.map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-700 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{member.name}</h4>
                          <p className="text-gray-400 text-xs">{member.role}</p>
                        </div>
                      </div>
                      <StarRating 
                        rating={ratings[`member_${member.id}`] || 0}
                        onRate={(rating) => handleRating(`member_${member.id}`, rating)}
                      />
                    </motion.div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Feedback</label>
                  <textarea
                    value={teamFeedback}
                    onChange={(e) => setTeamFeedback(e.target.value)}
                    placeholder="Share your thoughts on team dynamics, collaboration, or areas for improvement..."
                    className="w-full glass rounded-lg px-4 py-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitTeamFeedback}
                  className="w-full bg-gradient-to-r from-neon-purple to-electric-blue py-3 rounded-xl font-semibold"
                >
                  Submit {anonymousMode ? 'Anonymous' : ''} Feedback
                </motion.button>
              </div>
            </div>
          </div>
        ) : !selectedMember ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evaluations
              .filter(evaluation => activeTab === 'pending' ? evaluation.status === 'pending' : evaluation.status === 'completed')
              .map((evaluation, index) => (
              <motion.div
                key={evaluation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:shadow-neon-blue/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{evaluation.member}</h3>
                    <p className="text-electric-blue text-sm font-semibold">{evaluation.role}</p>
                    <p className="text-gray-400 text-sm">{evaluation.project}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    evaluation.status === 'pending' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {evaluation.status === 'pending' ? <Clock size={16} /> : <CheckCircle size={16} />}
                  </div>
                </div>

                {evaluation.status === 'completed' && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400">Overall Rating:</span>
                      <StarRating rating={evaluation.rating} readonly />
                      <span className="text-white font-semibold">{evaluation.rating}/5</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>Deadline: {evaluation.deadline}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMember(evaluation)}
                  className={`w-full py-3 rounded-xl font-semibold ${
                    evaluation.status === 'pending'
                      ? 'bg-gradient-to-r from-electric-blue to-neon-teal'
                      : 'glass border border-gray-600'
                  }`}
                >
                  {evaluation.status === 'pending' ? 'Start Evaluation' : 'View Details'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Evaluate {selectedMember.member}</h2>
                  <p className="text-gray-400">{selectedMember.role} • {selectedMember.project}</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={anonymousMode}
                      onChange={(e) => setAnonymousMode(e.target.checked)}
                      className="rounded"
                    />
                    Anonymous
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedMember(null)}
                    className="glass px-4 py-2 rounded-xl"
                  >
                    Back
                  </motion.button>
                </div>
              </div>

              <div className="space-y-6">
                {criteria.map((criterion) => (
                  <div key={criterion.id} className="border-b border-gray-700 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{criterion.label}</h3>
                        <p className="text-sm text-gray-400">Weight: {criterion.weight}%</p>
                      </div>
                      <StarRating 
                        rating={ratings[criterion.id] || 0}
                        onRate={(rating) => handleRating(criterion.id, rating)}
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <h3 className="text-lg font-semibold mb-4">Additional Comments</h3>
                  <textarea
                    placeholder="Provide specific feedback to help your teammate improve..."
                    className="w-full glass rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-400 text-sm">
                    <strong>Note:</strong> This evaluation will be {anonymousMode ? 'submitted anonymously' : 'attributed to you'}. Your feedback helps improve team collaboration.
                  </p>
                </div>

                <div className="flex gap-4 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMember(null)}
                    className="flex-1 glass py-3 rounded-xl font-semibold"
                  >
                    Save Draft
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      alert(`${anonymousMode ? 'Anonymous' : ''} Evaluation submitted for ${selectedMember.member}!`)
                      setSelectedMember(null)
                      setRatings({})
                    }}
                    className="flex-1 bg-gradient-to-r from-electric-blue to-neon-teal py-3 rounded-xl font-semibold"
                  >
                    Submit {anonymousMode ? 'Anonymous' : ''} Evaluation
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PeerEvaluation