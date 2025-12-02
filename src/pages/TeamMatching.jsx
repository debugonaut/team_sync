import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Heart, X, Code, Palette, Megaphone, BarChart3, Users, ArrowLeft, Plus, Minus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TeamMatching = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState('form') // 'form', 'matching', 'matches'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState([])
  const [teamRequirements, setTeamRequirements] = useState({
    purpose: '',
    teamSize: 3,
    duration: '',
    requiredSkills: [],
    description: ''
  })

  const purposes = ['Hackathon', 'College Project', 'Startup Idea', 'Competition', 'Research Project', 'Open Source Project']
  const durations = ['1-2 weeks', '1 month', '2-3 months', '6 months', '1 year', 'Long term']
  const availableSkills = ['Frontend Development', 'Backend Development', 'UI/UX Design', 'Mobile Development', 'Data Science', 'Machine Learning', 'DevOps', 'Marketing', 'Content Writing', 'Project Management']

  const profiles = [
    {
      id: 1,
      name: "Arjun Sharma",
      year: "3rd Year",
      branch: "Computer Engineering",
      domain: "Frontend Development",
      skills: ["React", "JavaScript", "UI/UX"],
      bio: "Passionate about creating beautiful user interfaces",
      projects: 8,
      hackathons: 3,
      avatar: "AS"
    },
    {
      id: 2,
      name: "Priya Patel",
      year: "2nd Year",
      branch: "Information Technology",
      domain: "UI/UX Design",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      bio: "Love designing intuitive user experiences",
      projects: 12,
      hackathons: 5,
      avatar: "PP"
    },
    {
      id: 3,
      name: "Rahul Desai",
      year: "4th Year",
      branch: "Computer Engineering",
      domain: "Backend Development",
      skills: ["Node.js", "Python", "MongoDB"],
      bio: "Building scalable backend systems",
      projects: 15,
      hackathons: 7,
      avatar: "RD"
    },
    {
      id: 4,
      name: "Sneha Kulkarni",
      year: "3rd Year",
      branch: "Electronics Engineering",
      domain: "Data Science",
      skills: ["Python", "Machine Learning", "Analytics"],
      bio: "Turning data into actionable insights",
      projects: 10,
      hackathons: 4,
      avatar: "SK"
    },
    {
      id: 5,
      name: "Vikram Singh",
      year: "2nd Year",
      branch: "Mechanical Engineering",
      domain: "Marketing",
      skills: ["Digital Marketing", "Content", "Strategy"],
      bio: "Creative marketer with tech background",
      projects: 6,
      hackathons: 2,
      avatar: "VS"
    },
    {
      id: 6,
      name: "Ananya Joshi",
      year: "4th Year",
      branch: "Computer Engineering",
      domain: "Full Stack Development",
      skills: ["MERN Stack", "DevOps", "Cloud"],
      bio: "End-to-end application developer",
      projects: 18,
      hackathons: 9,
      avatar: "AJ"
    },
    {
      id: 7,
      name: "Rohan Mehta",
      year: "3rd Year",
      branch: "Information Technology",
      domain: "Mobile Development",
      skills: ["Flutter", "React Native", "Firebase"],
      bio: "Building mobile apps that matter",
      projects: 11,
      hackathons: 6,
      avatar: "RM"
    },
    {
      id: 8,
      name: "Kavya Reddy",
      year: "2nd Year",
      branch: "Computer Engineering",
      domain: "Cybersecurity",
      skills: ["Ethical Hacking", "Network Security", "Forensics"],
      bio: "Protecting digital assets and privacy",
      projects: 7,
      hackathons: 3,
      avatar: "KR"
    }
  ]

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      setMatches([...matches, profiles[currentIndex]])
    }
    
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setStep('matches')
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setStep('matching')
  }

  const toggleSkill = (skill) => {
    setTeamRequirements(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter(s => s !== skill)
        : [...prev.requiredSkills, skill]
    }))
  }

  const getDomainIcon = (domain) => {
    switch (domain.toLowerCase()) {
      case 'frontend development':
      case 'backend development':
        return <Code className="text-electric-blue" size={20} />
      case 'ui/ux design':
        return <Palette className="text-neon-purple" size={20} />
      case 'marketing':
        return <Megaphone className="text-neon-teal" size={20} />
      case 'data science':
        return <BarChart3 className="text-electric-blue" size={20} />
      default:
        return <Users className="text-gray-400" size={20} />
    }
  }

  // Team Requirements Form
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-dark p-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-space font-bold gradient-text mb-4">
              Create Your Team
            </h2>
            <p className="text-gray-300">Tell us what kind of team you're looking for</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleFormSubmit}
            className="glass rounded-2xl p-6 space-y-6"
          >
            <div>
              <label className="block text-white font-semibold mb-3">Project Purpose</label>
              <div className="grid grid-cols-2 gap-3">
                {purposes.map((purpose) => (
                  <motion.button
                    key={purpose}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setTeamRequirements(prev => ({ ...prev, purpose }))}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      teamRequirements.purpose === purpose
                        ? 'border-electric-blue bg-electric-blue/20 text-electric-blue'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {purpose}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">
                Team Size: {teamRequirements.teamSize}
              </label>
              <div className="flex items-center gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setTeamRequirements(prev => ({ 
                    ...prev, 
                    teamSize: Math.max(2, prev.teamSize - 1) 
                  }))}
                  className="w-10 h-10 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center text-red-500"
                >
                  <Minus size={16} />
                </motion.button>
                <div className="flex-1 bg-dark/30 rounded-xl p-3 text-center">
                  <span className="text-2xl font-bold text-white">{teamRequirements.teamSize}</span>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setTeamRequirements(prev => ({ 
                    ...prev, 
                    teamSize: Math.min(10, prev.teamSize + 1) 
                  }))}
                  className="w-10 h-10 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center text-green-500"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Duration</label>
              <div className="grid grid-cols-2 gap-3">
                {durations.map((duration) => (
                  <motion.button
                    key={duration}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setTeamRequirements(prev => ({ ...prev, duration }))}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      teamRequirements.duration === duration
                        ? 'border-neon-teal bg-neon-teal/20 text-neon-teal'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {duration}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">
                Required Skills ({teamRequirements.requiredSkills.length})
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {availableSkills.map((skill) => (
                  <motion.button
                    key={skill}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => toggleSkill(skill)}
                    className={`p-2 rounded-lg border text-sm transition-all ${
                      teamRequirements.requiredSkills.includes(skill)
                        ? 'border-neon-purple bg-neon-purple/20 text-neon-purple'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Description</label>
              <textarea
                value={teamRequirements.description}
                onChange={(e) => setTeamRequirements(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your project..."
                className="w-full p-3 bg-dark/30 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-electric-blue focus:outline-none resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/dashboard')}
                className="flex-1 glass px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                disabled={!teamRequirements.purpose || !teamRequirements.duration}
                className="flex-1 bg-gradient-to-r from-electric-blue to-neon-teal px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                Find Teammates
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    )
  }

  if (step === 'matches') {
    return (
      <div className="min-h-screen bg-dark p-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-space font-bold gradient-text mb-4">
              Your Team Matches! 🎉
            </h2>
            <p className="text-gray-300">Found {matches.length} teammates for your {teamRequirements.purpose}</p>
          </motion.div>

          <div className="space-y-4 mb-8">
            {matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center text-xl font-bold">
                  {match.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{match.name}</h3>
                  <p className="text-gray-300">{match.domain}</p>
                  <div className="flex gap-2 mt-2">
                    {match.skills.slice(0, 2).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-electric-blue/20 text-electric-blue text-xs rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-electric-blue to-neon-teal px-4 py-2 rounded-xl text-sm font-semibold"
                >
                  Invite
                </motion.button>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('form')}
              className="flex-1 glass px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              New Search
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gradient-to-r from-neon-purple to-electric-blue px-6 py-3 rounded-xl font-semibold"
            >
              Dashboard
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-space font-bold gradient-text mb-2">
            Find Teammates
          </h2>
          <p className="text-gray-300">For your {teamRequirements.purpose}</p>
          <p className="text-sm text-gray-400">Swipe right to invite, left to pass</p>
        </motion.div>

        <div className="relative h-[600px] w-full">
          <AnimatePresence>
            {currentIndex < profiles.length && (
              <motion.div
                key={profiles[currentIndex].id}
                initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 glass rounded-3xl p-6 cursor-pointer"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 100) handleSwipe('right')
                  if (info.offset.x < -100) handleSwipe('left')
                }}
              >
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {profiles[currentIndex].avatar}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {profiles[currentIndex].name}
                  </h3>
                  <p className="text-gray-300">
                    {profiles[currentIndex].year} • {profiles[currentIndex].branch}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-dark/30 rounded-xl">
                    {getDomainIcon(profiles[currentIndex].domain)}
                    <span className="text-white font-semibold">
                      {profiles[currentIndex].domain}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {profiles[currentIndex].skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-electric-blue/20 text-electric-blue text-sm rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">About</h4>
                    <p className="text-gray-300 text-sm">
                      {profiles[currentIndex].bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-dark/30 rounded-xl">
                      <div className="text-xl font-bold text-electric-blue">
                        {profiles[currentIndex].projects}
                      </div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                    <div className="text-center p-3 bg-dark/30 rounded-xl">
                      <div className="text-xl font-bold text-neon-teal">
                        {profiles[currentIndex].hackathons}
                      </div>
                      <div className="text-xs text-gray-400">Hackathons</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-8 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center text-red-500"
          >
            <X size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center text-green-500"
          >
            <Heart size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default TeamMatching