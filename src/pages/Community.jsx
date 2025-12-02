import { motion } from 'framer-motion'
import { useState } from 'react'
import { Heart, MessageCircle, Share, Plus, Image, Smile, ArrowLeft, Users, Code, Palette, Briefcase, BookOpen, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Community = () => {
  const navigate = useNavigate()
  const [selectedCommunity, setSelectedCommunity] = useState('all')
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Harsh Khatri",
      avatar: "HK",
      time: "2 hours ago",
      content: "Just finished our hackathon project! 48 hours of coding and we built an amazing AI-powered study assistant. Team work makes the dream work! 🚀",
      likes: 24,
      comments: 8,
      image: null,
      community: 'tech'
    },
    {
      id: 2,
      author: "Prajwal Kate",
      avatar: "PK",
      time: "4 hours ago",
      content: "Anyone else excited for the upcoming Smart India Hackathon? Looking for a UI/UX designer to join our team. We're working on a fintech solution! 💡",
      likes: 15,
      comments: 12,
      image: null,
      community: 'clubs'
    },
    {
      id: 3,
      author: "Aadesh Khande",
      avatar: "AK",
      time: "1 day ago",
      content: "MITAOE campus looks absolutely stunning today! The new tech lab is finally ready. Can't wait to work on some amazing projects there 🏫✨",
      likes: 45,
      comments: 6,
      image: "campus",
      community: 'college'
    }
  ])
  const [newPost, setNewPost] = useState('')
  const [showCreatePost, setShowCreatePost] = useState(false)

  const communities = [
    { id: 'all', name: 'All Posts', icon: Users, color: 'from-electric-blue to-neon-teal', members: '2.5k' },
    { id: 'college', name: 'MITAOE Campus', icon: BookOpen, color: 'from-neon-purple to-electric-blue', members: '1.8k' },
    { id: 'tech', name: 'Tech & Development', icon: Code, color: 'from-electric-blue to-neon-purple', members: '950' },
    { id: 'design', name: 'Design & Creative', icon: Palette, color: 'from-neon-teal to-neon-purple', members: '620' },
    { id: 'clubs', name: 'Clubs & Events', icon: Trophy, color: 'from-neon-purple to-neon-teal', members: '1.2k' },
    { id: 'career', name: 'Career & Internships', icon: Briefcase, color: 'from-electric-blue to-neon-teal', members: '780' }
  ]

  const handleCreatePost = () => {
    if (!newPost.trim()) return
    
    const post = {
      id: Date.now(),
      author: "You",
      avatar: "YO",
      time: "now",
      content: newPost,
      likes: 0,
      comments: 0,
      image: null
    }
    
    setPosts([post, ...posts])
    setNewPost('')
    setShowCreatePost(false)
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-dark-gray border-b border-gray-800 p-6"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="p-2 glass rounded-xl"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className="text-2xl font-space font-bold gradient-text">MITAOE Community</h1>
              <p className="text-gray-400">Connect with fellow students</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreatePost(true)}
            className="bg-gradient-to-r from-electric-blue to-neon-teal px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            <Plus size={20} />
            Create Post
          </motion.button>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Communities Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Communities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {communities.map((community) => (
              <motion.button
                key={community.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCommunity(community.id)}
                className={`glass rounded-xl p-4 text-left transition-all ${
                  selectedCommunity === community.id
                    ? 'ring-2 ring-electric-blue bg-electric-blue/10'
                    : 'hover:bg-gray-700/30'
                }`}
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${community.color} rounded-lg flex items-center justify-center mb-3`}>
                  <community.icon size={20} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{community.name}</h3>
                <p className="text-xs text-gray-400">{community.members} members</p>
              </motion.button>
            ))}
          </div>
        </div>
        {/* Create Post Modal */}
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <div className="glass rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Share with Community</h3>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's happening at MITAOE today?"
                className="w-full bg-dark border border-gray-600 rounded-xl p-4 h-32 resize-none focus:outline-none focus:border-electric-blue"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-2 glass rounded-lg"
                  >
                    <Image size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-2 glass rounded-lg"
                  >
                    <Smile size={20} />
                  </motion.button>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowCreatePost(false)}
                    className="px-4 py-2 glass rounded-lg"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleCreatePost}
                    className="px-4 py-2 bg-gradient-to-r from-electric-blue to-neon-teal rounded-lg font-semibold"
                  >
                    Post
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts
            .filter(post => selectedCommunity === 'all' || post.community === selectedCommunity)
            .map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center font-bold">
                  {post.avatar}
                </div>
                  <div>
                    <h4 className="font-semibold">{post.author}</h4>
                    <p className="text-sm text-gray-400">{post.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
                  communities.find(c => c.id === post.community)?.color || 'from-gray-500 to-gray-600'
                }`}>
                  {communities.find(c => c.id === post.community)?.name || 'General'}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-gray-200 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-r from-electric-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <span className="text-gray-400">📸 Campus Image</span>
                  </div>
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Heart size={20} />
                    <span>{post.likes}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-400 hover:text-electric-blue transition-colors"
                  >
                    <MessageCircle size={20} />
                    <span>{post.comments}</span>
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-neon-teal transition-colors"
                >
                  <Share size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-8 py-3 rounded-xl font-semibold hover:bg-gray-700/50 transition-colors"
          >
            Load More Posts
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Community