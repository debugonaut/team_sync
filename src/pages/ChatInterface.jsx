import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Send, Smile, Paperclip, MoreVertical, 
  Phone, Video, Search, User, Code, Image, Users, 
  MessageCircle, Hash, Plus, Settings, Bell, BellOff, Calendar, Clock, X
} from 'lucide-react'

const ChatInterface = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [chatType, setChatType] = useState('personal') // 'personal', 'team', 'group'
  const [showChatList, setShowChatList] = useState(true)
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const messagesEndRef = useRef(null)

  const personalChats = [
    {
      id: 1,
      name: 'Harsh Khatri',
      avatar: 'HK',
      status: 'online',
      lastMessage: 'Hey! Ready for the presentation?',
      time: '2 min ago',
      unread: 2,
      type: 'personal'
    },
    {
      id: 2,
      name: 'Aadesh Khande',
      avatar: 'AK',
      status: 'away',
      lastMessage: 'Can you review my code?',
      time: '15 min ago',
      unread: 0,
      type: 'personal'
    },
    {
      id: 3,
      name: 'Prajwal Kate',
      avatar: 'PK',
      status: 'offline',
      lastMessage: 'Thanks for the help!',
      time: '1 hour ago',
      unread: 0,
      type: 'personal'
    }
  ]

  const teamChats = [
    {
      id: 4,
      name: 'Frontend Team',
      avatar: '🎨',
      members: 5,
      lastMessage: 'UI components are ready',
      time: '5 min ago',
      unread: 3,
      type: 'team'
    },
    {
      id: 5,
      name: 'Backend Team',
      avatar: '⚙️',
      members: 4,
      lastMessage: 'API endpoints deployed',
      time: '30 min ago',
      unread: 1,
      type: 'team'
    },
    {
      id: 6,
      name: 'Project Alpha',
      avatar: '🚀',
      members: 8,
      lastMessage: 'Sprint planning tomorrow',
      time: '2 hours ago',
      unread: 0,
      type: 'team'
    }
  ]

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        sender: 'Harsh Khatri',
        content: 'Hey! Ready for the presentation tomorrow?',
        time: '10:30 AM',
        isOwn: false,
        avatar: 'HK'
      },
      {
        id: 2,
        sender: 'You',
        content: 'Yes! I\'ve prepared all the slides. How about you?',
        time: '10:32 AM',
        isOwn: true
      }
    ],
    4: [
      {
        id: 1,
        sender: 'Aadesh Khande',
        content: 'UI components are ready for review',
        time: '9:15 AM',
        isOwn: false,
        avatar: 'AK'
      },
      {
        id: 2,
        sender: 'Prajwal Kate',
        content: 'Great! I\'ll integrate them with the backend',
        time: '9:20 AM',
        isOwn: false,
        avatar: 'PK'
      }
    ]
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChat])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim() || !activeChat) return

    const newMessage = {
      id: (messages[activeChat.id] || []).length + 1,
      sender: 'You',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    }

    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
    }))
    setMessage('')

    // Simulate response for demo
    if (activeChat.type === 'personal') {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const response = {
          id: (messages[activeChat.id] || []).length + 2,
          sender: activeChat.name,
          content: 'Thanks for the message! I\'ll get back to you soon.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
          avatar: activeChat.avatar
        }
        setMessages(prev => ({
          ...prev,
          [activeChat.id]: [...(prev[activeChat.id] || []), response]
        }))
      }, 2000)
    }
  }

  const renderMessage = (msg) => {
    if (msg.hasCode) {
      const parts = msg.content.split('```')
      return (
        <div>
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              const [language, ...codeLines] = part.split('\n')
              const code = codeLines.join('\n')
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-dark-gray rounded-xl p-4 my-2 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-electric-blue font-medium">{language}</span>
                    <Code size={16} className="text-gray-400" />
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                </motion.div>
              )
            } else {
              return part && <p key={index} className="whitespace-pre-wrap">{part}</p>
            }
          })}
        </div>
      )
    }
    return <p className="whitespace-pre-wrap">{msg.content}</p>
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Chat Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: showChatList ? 0 : -300, opacity: showChatList ? 1 : 0 }}
        className="w-80 bg-dark-gray border-r border-gray-800 flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold gradient-text">Messages</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/dashboard')}
              className="p-2 glass rounded-xl"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </div>
          
          {/* Chat Type Tabs */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setChatType('personal')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                chatType === 'personal' 
                  ? 'bg-electric-blue text-white' 
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              <MessageCircle size={16} />
              Personal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setChatType('team')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                chatType === 'team' 
                  ? 'bg-electric-blue text-white' 
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              <Users size={16} />
              Teams
            </motion.button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {(chatType === 'personal' ? personalChats : teamChats).map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveChat(chat)}
              className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors ${
                activeChat?.id === chat.id ? 'bg-electric-blue/10 border-electric-blue/30' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-electric-blue to-neon-teal rounded-full flex items-center justify-center text-white font-bold">
                    {chat.avatar}
                  </div>
                  {chat.type === 'personal' && (
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-dark-gray ${
                      chat.status === 'online' ? 'bg-green-400' : 
                      chat.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 truncate">
                      {chat.type === 'team' && `${chat.members} members • `}{chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-electric-blue text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-t border-gray-800">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewChatModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-electric-blue to-neon-teal py-3 rounded-xl font-semibold"
          >
            <Plus size={20} />
            New {chatType === 'personal' ? 'Chat' : 'Team'}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <motion.header
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-dark-gray border-b border-gray-800 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowChatList(!showChatList)}
                    className="p-2 glass rounded-xl lg:hidden"
                  >
                    <MessageCircle size={20} />
                  </motion.button>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center text-white font-bold">
                      {activeChat.avatar}
                    </div>
                    <div>
                      <h2 className="font-semibold">{activeChat.name}</h2>
                      <p className="text-sm text-gray-400">
                        {activeChat.type === 'personal' 
                          ? activeChat.status 
                          : `${activeChat.members} members`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeChat.type === 'personal' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => alert(`Starting voice call with ${activeChat.name}...`)}
                        className="p-2 glass rounded-xl hover:bg-green-500/20"
                      >
                        <Phone size={20} className="text-green-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => alert(`Starting video call with ${activeChat.name}...`)}
                        className="p-2 glass rounded-xl hover:bg-blue-500/20"
                      >
                        <Video size={20} className="text-blue-400" />
                      </motion.button>
                    </>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSearchQuery(searchQuery ? '' : 'search')}
                    className="p-2 glass rounded-xl hover:bg-electric-blue/20"
                  >
                    <Search size={20} className={searchQuery ? 'text-electric-blue' : 'text-gray-400'} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => alert(`${activeChat.name} settings opened`)}
                    className="p-2 glass rounded-xl hover:bg-gray-500/20"
                  >
                    <Settings size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.header>

            {/* Messages Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {(messages[activeChat.id] || []).map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-xs md:max-w-md lg:max-w-lg ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!msg.isOwn && (
                      <div className="w-8 h-8 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center text-sm flex-shrink-0 font-bold text-white">
                        {msg.avatar || <User size={16} />}
                      </div>
                    )}
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`rounded-2xl p-4 ${
                        msg.isOwn
                          ? 'bg-gradient-to-r from-electric-blue to-neon-teal text-white'
                          : 'glass border border-gray-700'
                      } ${msg.isOwn ? 'rounded-br-md' : 'rounded-bl-md'}`}
                    >
                      {renderMessage(msg)}
                      <div className={`text-xs mt-2 ${msg.isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
                        {msg.time}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {activeChat.avatar}
                    </div>
                    <div className="glass border border-gray-700 rounded-2xl rounded-bl-md p-4">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-electric-blue rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-electric-blue rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-electric-blue rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </motion.div>

            {/* Message Input */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-dark-gray border-t border-gray-800 p-4"
            >
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="button"
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.multiple = true
                    input.onchange = (e) => {
                      const files = Array.from(e.target.files)
                      alert(`Selected ${files.length} file(s): ${files.map(f => f.name).join(', ')}`)
                    }
                    input.click()
                  }}
                  className="p-3 glass rounded-xl hover:bg-electric-blue/20"
                >
                  <Paperclip size={20} className="text-gray-400 hover:text-electric-blue" />
                </motion.button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Message ${activeChat.name}...`}
                    className="w-full glass rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={() => {
                      setShowEmojiPicker(!showEmojiPicker)
                      if (!showEmojiPicker) {
                        setTimeout(() => setShowEmojiPicker(false), 3000)
                      }
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 glass rounded-lg hover:bg-yellow-500/20"
                  >
                    <Smile size={20} className={showEmojiPicker ? 'text-yellow-400' : 'text-gray-400'} />
                  </motion.button>
                  {showEmojiPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 bottom-full mb-2 glass rounded-lg p-3 flex gap-2 text-xl"
                    >
                      {['😀', '😂', '❤️', '👍', '👎', '😢', '😮', '😡'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setMessage(prev => prev + emoji)
                            setShowEmojiPicker(false)
                          }}
                          className="hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!message.trim()}
                  className="p-3 bg-gradient-to-r from-electric-blue to-neon-teal rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </motion.button>
              </form>
            </motion.div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-electric-blue to-neon-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Select a conversation</h3>
              <p className="text-gray-400">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold gradient-text">
                New {chatType === 'personal' ? 'Chat' : 'Team'}
              </h2>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="p-2 glass rounded-lg hover:bg-red-500/20"
              >
                <MoreVertical size={20} className="rotate-45" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {chatType === 'personal' ? 'Select User' : 'Team Name'}
                </label>
                <input
                  type="text"
                  placeholder={chatType === 'personal' ? 'Search users...' : 'Enter team name...'}
                  className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                />
              </div>
              
              {chatType === 'team' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Add Members</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {personalChats.map(user => (
                      <label key={user.id} className="flex items-center gap-3 p-2 glass rounded-lg cursor-pointer hover:bg-electric-blue/10">
                        <input type="checkbox" className="rounded" />
                        <div className="w-8 h-8 bg-gradient-to-r from-electric-blue to-neon-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.avatar}
                        </div>
                        <span className="text-white">{user.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowNewChatModal(false)}
                  className="flex-1 glass py-3 rounded-xl font-semibold hover:bg-gray-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(`${chatType === 'personal' ? 'Chat' : 'Team'} created successfully!`)
                    setShowNewChatModal(false)
                  }}
                  className="flex-1 bg-gradient-to-r from-electric-blue to-neon-teal py-3 rounded-xl font-semibold"
                >
                  Create
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ChatInterface