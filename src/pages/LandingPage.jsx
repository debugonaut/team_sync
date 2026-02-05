import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Users, MessageCircle, Award, Github, Linkedin, Instagram, Target, Zap, Shield, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

const LandingPage = () => {
  const navigate = useNavigate()
  const [counters, setCounters] = useState({ students: 0, mentors: 0, doubts: 0 })

  useEffect(() => {
    const animateCounters = () => {
      const targets = { students: 2500, mentors: 150, doubts: 5000 }
      const duration = 2000
      const steps = 60
      const increment = duration / steps

      let current = { students: 0, mentors: 0, doubts: 0 }
      const timer = setInterval(() => {
        current.students = Math.min(current.students + targets.students / steps, targets.students)
        current.mentors = Math.min(current.mentors + targets.mentors / steps, targets.mentors)
        current.doubts = Math.min(current.doubts + targets.doubts / steps, targets.doubts)
        
        setCounters({
          students: Math.floor(current.students),
          mentors: Math.floor(current.mentors),
          doubts: Math.floor(current.doubts)
        })

        if (current.students >= targets.students) clearInterval(timer)
      }, increment)
    }

    const timer = setTimeout(animateCounters, 1000)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    { icon: Target, title: "Smart Matching", desc: "AI-powered algorithm matches you with teammates based on skills and interests" },
    { icon: MessageCircle, title: "Real-time Chat", desc: "Seamless communication with your team members and project collaboration" },
    { icon: Award, title: "Event Integration", desc: "Stay updated with hackathons, competitions, and college events" },
    { icon: Users, title: "Team Building", desc: "Find the perfect team composition for any project or competition" }
  ]

  const whyChooseUs = [
    { icon: Zap, title: "Lightning Fast", desc: "Find your perfect team in minutes, not days" },
    { icon: Shield, title: "MITAOE Exclusive", desc: "Verified students only - safe and trusted environment" },
    { icon: TrendingUp, title: "Proven Success", desc: "150+ teams formed, 50+ hackathons won" },
    { icon: Target, title: "Skill-Based", desc: "Match based on complementary skills and domains" }
  ]

  const testimonials = [
    { name: "Arjun K.", college: "MITAOE - CSE", text: "Found the perfect design partner for our hackathon!" },
    { name: "Priya S.", college: "MITAOE - IT", text: "TeamSync helped me connect with amazing developers." },
    { name: "Rahul M.", college: "MITAOE - CSE", text: "Won 3 hackathons with teams I found here!" }
  ]

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-dark to-dark" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" /> {/* Subtle grid pattern for tech vibe */}
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-space font-bold mb-6">
              <span className="gradient-text">MITAOE TeamSync</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
            >
              Professional Collaboration Platform for MITAOE Students
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 191, 255, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-electric-blue to-neon-teal px-8 py-4 rounded-2xl font-semibold text-lg flex items-center gap-2 hover:shadow-neon-blue transition-all duration-300"
            >
              Find Your Team <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="glass px-8 py-4 rounded-2xl font-semibold text-lg border border-neon-purple/30 hover:border-neon-purple/60 transition-all duration-300"
            >
              Join Events
            </motion.button>
          </motion.div>

          {/* Stats Counter */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-electric-blue mb-2">{counters.students.toLocaleString()}+</div>
              <div className="text-gray-400">Active Students</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-neon-teal mb-2">{counters.mentors}+</div>
              <div className="text-gray-400">Teams Formed</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-neon-purple mb-2">{counters.doubts.toLocaleString()}+</div>
              <div className="text-gray-400">Successful Matches</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-gradient-to-b from-dark to-dark-gray"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-space font-bold text-center mb-4 gradient-text">
            Our Services
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Everything you need to build winning teams</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass rounded-2xl p-6 text-center hover:shadow-neon-blue/20 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-electric-blue to-neon-teal rounded-full flex items-center justify-center">
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-electric-blue">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-space font-bold text-center mb-4 gradient-text">
            Why Choose TeamSync?
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">The ultimate platform for MITAOE student collaboration</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="glass rounded-2xl p-8 hover:shadow-neon-purple/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-neon-purple to-neon-teal rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-neon-purple">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-space font-bold text-center mb-16 gradient-text">
            What MITAOE Students Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-2xl p-6 hover:shadow-neon-blue/20 transition-all duration-300"
              >
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.college}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-space font-bold gradient-text mb-2">MITAOE TeamSync</h3>
              <p className="text-gray-400">Connecting MITAOE students for professional collaboration</p>
            </div>
            
            <div className="flex items-center gap-6">
              <motion.a
                whileHover={{ scale: 1.2, color: "#00BFFF" }}
                href="#" className="text-gray-400 hover:text-electric-blue transition-colors"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: "#8A2BE2" }}
                href="#" className="text-gray-400 hover:text-neon-purple transition-colors"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: "#00E5A0" }}
                href="#" className="text-gray-400 hover:text-neon-teal transition-colors"
              >
                <Instagram size={24} />
              </motion.a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 MITAOE TeamSync. Made with ❤️ for MITAOE students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage