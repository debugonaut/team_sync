import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import ChatInterface from './pages/ChatInterface'
import ProfilePage from './pages/ProfilePage'
import TeamMatching from './pages/TeamMatching'
import Community from './pages/Community'
import ProjectManagement from './pages/ProjectManagement'
import ClubsEvents from './pages/ClubsEvents'
import PeerEvaluation from './pages/PeerEvaluation'
import Chatbot from './components/Chatbot'

function AppContent() {
  const location = useLocation()
  const showChatbot = location.pathname !== '/' && location.pathname !== '/login'

  return (
    <div className="min-h-screen bg-dark">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/team-matching" element={<TeamMatching />} />
          <Route path="/community" element={<Community />} />
          <Route path="/projects" element={<ProjectManagement />} />
          <Route path="/clubs-events" element={<ClubsEvents />} />
          <Route path="/peer-evaluation" element={<PeerEvaluation />} />
        </Routes>
      </AnimatePresence>
      {showChatbot && <Chatbot />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App