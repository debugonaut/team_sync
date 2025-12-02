import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm TeamSync Bot 🤖 How can I help you navigate MITAOE TeamSync?", sender: 'bot' }
  ])
  const [inputText, setInputText] = useState('')
  const navigate = useNavigate()

  const quickActions = [
    { text: "Find teammates", action: () => navigate('/team-matching') },
    { text: "Manage projects", action: () => navigate('/projects') },
    { text: "View events", action: () => navigate('/clubs-events') },
    { text: "Peer evaluation", action: () => navigate('/peer-evaluation') }
  ]

  const botResponses = {
    'team': "I can help you find teammates! Click 'Find teammates' or go to Team Matching to swipe through potential collaborators.",
    'project': "Manage your team projects effectively! Go to Projects to track progress, assign tasks, and collaborate.",
    'event': "Check out upcoming hackathons and competitions in Clubs & Events. Join clubs and register for events!",
    'community': "Visit the Community page to see what fellow MITAOE students are sharing and discussing!",
    'evaluation': "Provide structured feedback to teammates through Peer Evaluation to improve teamwork quality.",
    'profile': "You can update your skills, domain, and projects in your Profile page. This helps in better team matching!",
    'help': "I can help you with: Finding teammates, Managing projects, Viewing events, Community updates, Peer evaluation, Profile editing, and general navigation.",
    'default': "I'm here to help you navigate TeamSync! Try asking about teams, projects, events, community, evaluation, or profile."
  }

  const handleSend = () => {
    if (!inputText.trim()) return

    const userMessage = { id: Date.now(), text: inputText, sender: 'user' }
    setMessages(prev => [...prev, userMessage])

    const lowerText = inputText.toLowerCase()
    let response = botResponses.default
    
    if (lowerText.includes('team') || lowerText.includes('match')) response = botResponses.team
    else if (lowerText.includes('project') || lowerText.includes('task')) response = botResponses.project
    else if (lowerText.includes('event') || lowerText.includes('hackathon') || lowerText.includes('club')) response = botResponses.event
    else if (lowerText.includes('community') || lowerText.includes('post')) response = botResponses.community
    else if (lowerText.includes('evaluation') || lowerText.includes('feedback') || lowerText.includes('review')) response = botResponses.evaluation
    else if (lowerText.includes('profile') || lowerText.includes('skill')) response = botResponses.profile
    else if (lowerText.includes('help')) response = botResponses.help

    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, text: response, sender: 'bot' }
      setMessages(prev => [...prev, botMessage])
    }, 500)

    setInputText('')
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-neon-purple to-electric-blue rounded-full flex items-center justify-center shadow-lg z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-6 w-80 h-96 glass rounded-2xl flex flex-col z-50 border border-gray-700"
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-electric-blue rounded-full flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">TeamSync Bot</h3>
                  <p className="text-xs text-gray-400">Always here to help!</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-electric-blue text-white' 
                      : 'bg-gray-800 text-gray-200'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="text-xs p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {action.text}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-electric-blue"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="p-2 bg-electric-blue rounded-lg hover:bg-electric-blue/80 transition-colors"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot