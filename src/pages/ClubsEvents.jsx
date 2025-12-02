import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Calendar, Users, MapPin, Clock, Star, X, User, Mail, Phone, GraduationCap, FileText, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ClubsEvents = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('events')
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedClub, setSelectedClub] = useState(null)
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    year: '',
    branch: '',
    experience: '',
    motivation: ''
  })
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    category: '',
    organizerName: '',
    organizerEmail: '',
    organizerPhone: '',
    clubAffiliation: '',
    budget: '',
    requirements: ''
  })

  const events = [
    {
      id: 1,
      title: "Smart India Hackathon 2024",
      club: "Vertex GDNA",
      date: "Dec 20-22, 2024",
      time: "9:00 AM",
      location: "Tech Lab A",
      participants: 120,
      maxParticipants: 150,
      category: "hackathon",
      status: "open"
    },
    {
      id: 2,
      title: "CodeChef Cook-Off Contest",
      club: "Codechef Club",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Computer Lab B",
      participants: 85,
      maxParticipants: 100,
      category: "contest",
      status: "open"
    },
    {
      id: 3,
      title: "GFG Problem Solving Marathon",
      club: "GFG Campus Body",
      date: "Dec 25, 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
      participants: 67,
      maxParticipants: 80,
      category: "workshop",
      status: "open"
    },
    {
      id: 4,
      title: "Campus Photography Contest",
      club: "Shutterbug Club",
      date: "Dec 22, 2024",
      time: "11:00 AM",
      location: "Campus Grounds",
      participants: 34,
      maxParticipants: 50,
      category: "contest",
      status: "open"
    },
    {
      id: 5,
      title: "Annual Cultural Night",
      club: "Cultural Fiesta",
      date: "Dec 30, 2024",
      time: "6:00 PM",
      location: "Main Stage",
      participants: 156,
      maxParticipants: 200,
      category: "cultural",
      status: "open"
    },
    {
      id: 6,
      title: "Tech Talk: AI in Industry",
      club: "Vertex GDNA",
      date: "Jan 5, 2025",
      time: "3:00 PM",
      location: "Seminar Hall",
      participants: 78,
      maxParticipants: 120,
      category: "seminar",
      status: "open"
    }
  ]

  const clubs = [
    {
      id: 1,
      name: "Vertex GDNA",
      members: 234,
      category: "Technical",
      description: "Learn programming, participate in hackathons, and build amazing projects",
      events: 12,
      rating: 4.8,
      registrationDeadline: "2025-10-10",
      registrationOpen: false
    },
    {
      id: 2,
      name: "GFG Campus Body",
      members: 189,
      category: "Technical",
      description: "GeeksforGeeks campus chapter for competitive programming and DSA",
      events: 15,
      rating: 4.9,
      registrationDeadline: "2025-11-15",
      registrationOpen: false
    },
    {
      id: 3,
      name: "Codechef Club",
      members: 156,
      category: "Technical",
      description: "Competitive programming, contests, and algorithmic problem solving",
      events: 18,
      rating: 4.7,
      registrationDeadline: "2025-11-12",
      registrationOpen: false
    },
    {
      id: 4,
      name: "Shutterbug Club",
      members: 98,
      category: "Creative",
      description: "Photography, visual storytelling, and creative media production",
      events: 8,
      rating: 4.6,
      registrationDeadline: "2025-12-25",
      registrationOpen: true
    },
    {
      id: 5,
      name: "GDG Club",
      members: 267,
      category: "Technical",
      description: "Code, Coffee, drama, and marketing, events organization",
      events: 22,
      rating: 4.8,
      registrationDeadline: "2025-12-30",
      registrationOpen: true
    },
    {
      id: 6,
      name: "Debate Society",
      members: 145,
      category: "Literary",
      description: "Enhance public speaking, critical thinking, and argumentation skills",
      events: 10,
      rating: 4.5,
      registrationDeadline: "2025-12-28",
      registrationOpen: true
    } 
  ]

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
              <h1 className="text-2xl font-space font-bold gradient-text">Clubs & Events</h1>
              <p className="text-gray-400">Discover campus activities and join clubs</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                activeTab === 'events' 
                  ? 'bg-electric-blue text-white' 
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              Events
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('clubs')}
              className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                activeTab === 'clubs' 
                  ? 'bg-electric-blue text-white' 
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              Clubs
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'events' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEventModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-neon-purple to-electric-blue px-4 py-2 rounded-xl font-semibold text-white"
              >
                <Plus size={20} />
                Organize Event
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:shadow-neon-blue/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-electric-blue text-sm font-semibold">{event.club}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {event.status}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users size={16} />
                    <span>{event.participants}/{event.maxParticipants} participants</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-electric-blue to-neon-teal h-2 rounded-full"
                      style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-electric-blue to-neon-teal py-3 rounded-xl font-semibold"
                >
                  Register Now
                </motion.button>
              </motion.div>
            ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:shadow-neon-purple/20 transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                  <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple text-sm rounded-lg">
                    {club.category}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {club.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Members</span>
                    <span className="text-white font-semibold">{club.members}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Events</span>
                    <span className="text-white font-semibold">{club.events}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{club.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Registration Deadline</span>
                    <span className={`font-semibold ${
                      club.registrationOpen ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {new Date(club.registrationDeadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs text-center ${
                    club.registrationOpen 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {club.registrationOpen ? 'Registration Open' : 'Registration Closed'}
                  </div>
                </div>

                <motion.button
                  whileHover={club.registrationOpen ? { scale: 1.05 } : {}}
                  whileTap={club.registrationOpen ? { scale: 0.95 } : {}}
                  onClick={() => {
                    if (club.registrationOpen) {
                      setSelectedClub(club)
                      setShowRegistrationModal(true)
                    }
                  }}
                  disabled={!club.registrationOpen}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    club.registrationOpen
                      ? 'bg-gradient-to-r from-neon-purple to-electric-blue hover:from-neon-purple/80 hover:to-electric-blue/80 text-white cursor-pointer'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {club.registrationOpen ? 'Join Club' : 'Registration Closed'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && selectedClub && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold gradient-text">Join {selectedClub.name}</h2>
              <button
                onClick={() => {
                  setShowRegistrationModal(false)
                  setSelectedClub(null)
                  setRegistrationData({
                    fullName: '',
                    email: '',
                    phone: '',
                    studentId: '',
                    year: '',
                    branch: '',
                    experience: '',
                    motivation: ''
                  })
                }}
                className="p-2 glass rounded-lg hover:bg-red-500/20"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              // Handle registration submission
              alert(`Registration submitted for ${selectedClub.name}!`)
              setShowRegistrationModal(false)
              setSelectedClub(null)
              setRegistrationData({
                fullName: '',
                email: '',
                phone: '',
                studentId: '',
                year: '',
                branch: '',
                experience: '',
                motivation: ''
              })
            }} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <User size={16} />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={registrationData.fullName}
                  onChange={(e) => setRegistrationData({...registrationData, fullName: e.target.value})}
                  className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Mail size={16} />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                  className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Phone size={16} />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={registrationData.phone}
                  onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                  className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <GraduationCap size={16} />
                  Student ID *
                </label>
                <input
                  type="text"
                  required
                  value={registrationData.studentId}
                  onChange={(e) => setRegistrationData({...registrationData, studentId: e.target.value})}
                  className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                  placeholder="Enter your student ID"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Year *</label>
                  <select
                    required
                    value={registrationData.year}
                    onChange={(e) => setRegistrationData({...registrationData, year: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">Select Year</option>
                    <option value="1st" className="bg-gray-800 text-white">1st Year</option>
                    <option value="2nd" className="bg-gray-800 text-white">2nd Year</option>
                    <option value="3rd" className="bg-gray-800 text-white">3rd Year</option>
                    <option value="4th" className="bg-gray-800 text-white">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Branch *</label>
                  <select
                    required
                    value={registrationData.branch}
                    onChange={(e) => setRegistrationData({...registrationData, branch: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">Select Branch</option>
                    <option value="CSE" className="bg-gray-800 text-white">Computer Science</option>
                    <option value="IT" className="bg-gray-800 text-white">Information Technology</option>
                    <option value="ECE" className="bg-gray-800 text-white">Electronics & Communication</option>
                    <option value="EEE" className="bg-gray-800 text-white">Electrical Engineering</option>
                    <option value="MECH" className="bg-gray-800 text-white">Mechanical Engineering</option>
                    <option value="CIVIL" className="bg-gray-800 text-white">Civil Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <FileText size={16} />
                  Previous Experience
                </label>
                <textarea
                  value={registrationData.experience}
                  onChange={(e) => setRegistrationData({...registrationData, experience: e.target.value})}
                  className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 h-20 resize-none"
                  placeholder="Any relevant experience or skills..."
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Why do you want to join? *</label>
                <textarea
                  required
                  value={registrationData.motivation}
                  onChange={(e) => setRegistrationData({...registrationData, motivation: e.target.value})}
                  className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 h-24 resize-none"
                  placeholder="Tell us your motivation for joining this club..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRegistrationModal(false)
                    setSelectedClub(null)
                  }}
                  className="flex-1 glass py-3 rounded-xl font-semibold hover:bg-gray-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-electric-blue to-neon-teal py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Event Organization Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold gradient-text">Organize New Event</h2>
              <button
                onClick={() => {
                  setShowEventModal(false)
                  setEventData({
                    title: '',
                    description: '',
                    date: '',
                    time: '',
                    location: '',
                    maxParticipants: '',
                    category: '',
                    organizerName: '',
                    organizerEmail: '',
                    organizerPhone: '',
                    clubAffiliation: '',
                    budget: '',
                    requirements: ''
                  })
                }}
                className="p-2 glass rounded-lg hover:bg-red-500/20"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              alert('Event proposal submitted for admin approval!')
              setShowEventModal(false)
              setEventData({
                title: '',
                description: '',
                date: '',
                time: '',
                location: '',
                maxParticipants: '',
                category: '',
                organizerName: '',
                organizerEmail: '',
                organizerPhone: '',
                clubAffiliation: '',
                budget: '',
                requirements: ''
              })
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventData.title}
                    onChange={(e) => setEventData({...eventData, title: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                    placeholder="Enter event title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Description *</label>
                  <textarea
                    required
                    value={eventData.description}
                    onChange={(e) => setEventData({...eventData, description: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 h-24 resize-none text-white"
                    placeholder="Describe your event..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Date *</label>
                  <input
                    type="date"
                    required
                    value={eventData.date}
                    onChange={(e) => setEventData({...eventData, date: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Time *</label>
                  <input
                    type="time"
                    required
                    value={eventData.time}
                    onChange={(e) => setEventData({...eventData, time: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location *</label>
                  <input
                    type="text"
                    required
                    value={eventData.location}
                    onChange={(e) => setEventData({...eventData, location: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                    placeholder="Event venue"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Max Participants *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={eventData.maxParticipants}
                    onChange={(e) => setEventData({...eventData, maxParticipants: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                    placeholder="Maximum capacity"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category *</label>
                  <select
                    required
                    value={eventData.category}
                    onChange={(e) => setEventData({...eventData, category: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">Select Category</option>
                    <option value="hackathon" className="bg-gray-800 text-white">Hackathon</option>
                    <option value="contest" className="bg-gray-800 text-white">Contest</option>
                    <option value="workshop" className="bg-gray-800 text-white">Workshop</option>
                    <option value="seminar" className="bg-gray-800 text-white">Seminar</option>
                    <option value="cultural" className="bg-gray-800 text-white">Cultural</option>
                    <option value="sports" className="bg-gray-800 text-white">Sports</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Club Affiliation</label>
                  <select
                    value={eventData.clubAffiliation}
                    onChange={(e) => setEventData({...eventData, clubAffiliation: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">Select Club (Optional)</option>
                    <option value="Vertex GDNA" className="bg-gray-800 text-white">Vertex GDNA</option>
                    <option value="GFG Campus Body" className="bg-gray-800 text-white">GFG Campus Body</option>
                    <option value="Codechef Club" className="bg-gray-800 text-white">Codechef Club</option>
                    <option value="Shutterbug Club" className="bg-gray-800 text-white">Shutterbug Club</option>
                    <option value="GDG Club" className="bg-gray-800 text-white">GDG Club</option>
                    <option value="Debate Society" className="bg-gray-800 text-white">Debate Society</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Organizer Name *</label>
                  <input
                    type="text"
                    required
                    value={eventData.organizerName}
                    onChange={(e) => setEventData({...eventData, organizerName: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Organizer Email *</label>
                  <input
                    type="email"
                    required
                    value={eventData.organizerEmail}
                    onChange={(e) => setEventData({...eventData, organizerEmail: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={eventData.organizerPhone}
                    onChange={(e) => setEventData({...eventData, organizerPhone: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Estimated Budget</label>
                  <input
                    type="number"
                    min="0"
                    value={eventData.budget}
                    onChange={(e) => setEventData({...eventData, budget: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                    placeholder="Budget in ₹"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Special Requirements</label>
                  <textarea
                    value={eventData.requirements}
                    onChange={(e) => setEventData({...eventData, requirements: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 h-20 resize-none text-white"
                    placeholder="Any special equipment, permissions, or arrangements needed..."
                  />
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-6">
                <p className="text-yellow-400 text-sm">
                  <strong>Note:</strong> Your event proposal will be reviewed by the admin team. You will receive an email notification regarding the approval status within 2-3 business days.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 glass py-3 rounded-xl font-semibold hover:bg-gray-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-neon-purple to-electric-blue py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ClubsEvents