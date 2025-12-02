import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Plus, Users, Calendar, CheckCircle, Clock, AlertCircle, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProjectManagement = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('projects')
  const [showModal, setShowModal] = useState(false)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Smart Campus IoT System",
      team: ["Arjun (Coder)", "Priya (Designer)", "Rohit (Presenter)"],
      progress: 75,
      deadline: "Dec 15, 2024",
      status: "active",
      tasks: 12,
      completed: 9
    },
    {
      id: 2,
      name: "AI Study Assistant",
      team: ["Sneha (Data Scientist)", "Ananya (Full Stack)", "Vikram (Marketing)"],
      progress: 45,
      deadline: "Jan 10, 2025",
      status: "active",
      tasks: 8,
      completed: 4
    },
    {
      id: 3,
      name: "E-commerce Mobile App",
      team: ["Rohan (Mobile Dev)", "Priya (UI/UX)", "Kavya (Security)"],
      progress: 60,
      deadline: "Dec 28, 2024",
      status: "active",
      tasks: 15,
      completed: 9
    },
    {
      id: 4,
      name: "Campus Event Management",
      team: ["Ananya (Backend)", "Vikram (Marketing)", "Arjun (Frontend)"],
      progress: 30,
      deadline: "Jan 15, 2025",
      status: "planning",
      tasks: 10,
      completed: 3
    },
    {
      id: 5,
      name: "Student Feedback System",
      team: ["Kavya (Security)", "Sneha (Analytics)", "Rohan (Mobile)"],
      progress: 85,
      deadline: "Dec 20, 2024",
      status: "active",
      tasks: 14,
      completed: 12
    }
  ])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    teamMembers: [{ id: '', name: '', email: '', role: '' }]
  })

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { id: '', name: '', email: '', role: '' }]
    }))
  }

  const updateTeamMember = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProject = {
      id: projects.length + 1,
      name: formData.name,
      team: formData.teamMembers.map(m => `${m.name} (${m.role})`),
      progress: 0,
      deadline: new Date(formData.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'planning',
      tasks: 0,
      completed: 0
    }
    setProjects(prev => [...prev, newProject])
    setShowModal(false)
    setFormData({ name: '', description: '', deadline: '', teamMembers: [{ id: '', name: '', email: '', role: '' }] })
  }



  const tasks = [
    { id: 1, title: "Design UI mockups", assignee: "Priya", status: "completed", priority: "high" },
    { id: 2, title: "Backend API development", assignee: "Arjun", status: "in-progress", priority: "high" },
    { id: 3, title: "Prepare presentation slides", assignee: "Rohit", status: "pending", priority: "medium" },
    { id: 4, title: "Mobile app testing", assignee: "Rohan", status: "in-progress", priority: "high" },
    { id: 5, title: "Data model optimization", assignee: "Sneha", status: "completed", priority: "medium" },
    { id: 6, title: "Security audit", assignee: "Kavya", status: "pending", priority: "high" },
    { id: 7, title: "Marketing strategy", assignee: "Vikram", status: "completed", priority: "low" },
    { id: 8, title: "Cloud deployment", assignee: "Ananya", status: "in-progress", priority: "medium" },
    { id: 9, title: "User feedback analysis", assignee: "Sneha", status: "pending", priority: "low" },
    { id: 10, title: "Performance optimization", assignee: "Ananya", status: "pending", priority: "medium" }
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
              <h1 className="text-2xl font-space font-bold gradient-text">Project Management</h1>
              <p className="text-gray-400">Manage your team projects effectively</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-electric-blue to-neon-teal px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            <Plus size={20} />
            New Project
          </motion.button>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2 space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Users size={16} className="text-gray-400" />
                  <div className="flex gap-2">
                    {project.team.map((member, i) => (
                      <span key={i} className="px-2 py-1 bg-electric-blue/20 text-electric-blue text-xs rounded-lg">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-electric-blue to-neon-teal h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <CheckCircle size={16} />
                      {project.completed}/{project.tasks} tasks
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {project.deadline}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Task Panel */}
          <div>
            <h3 className="text-xl font-bold mb-4">Recent Tasks</h3>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{task.title}</h4>
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-400' : 
                      task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{task.assignee}</span>
                    <div className={`flex items-center gap-1 ${
                      task.status === 'completed' ? 'text-green-400' :
                      task.status === 'in-progress' ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {task.status === 'completed' ? <CheckCircle size={12} /> :
                       task.status === 'in-progress' ? <Clock size={12} /> : <AlertCircle size={12} />}
                      {task.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-dark-gray rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">Create New Project</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-700 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-electric-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-electric-blue h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Deadline</label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-electric-blue"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium">Team Members</label>
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="text-electric-blue hover:text-neon-teal text-sm"
                  >
                    + Add Member
                  </button>
                </div>
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3 mb-3 p-3 bg-gray-800/50 rounded-lg">
                    <input
                      type="text"
                      placeholder="Member ID"
                      value={member.id}
                      onChange={(e) => updateTeamMember(index, 'id', e.target.value)}
                      className="p-2 bg-gray-800 rounded border border-gray-700 focus:border-electric-blue"
                    />
                    <input
                      type="text"
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                      className="p-2 bg-gray-800 rounded border border-gray-700 focus:border-electric-blue"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={member.email}
                      onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                      className="p-2 bg-gray-800 rounded border border-gray-700 focus:border-electric-blue"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                      className="p-2 bg-gray-800 rounded border border-gray-700 focus:border-electric-blue"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-electric-blue to-neon-teal rounded-lg font-semibold"
                >
                  Create Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ProjectManagement