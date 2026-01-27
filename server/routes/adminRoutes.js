const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware, checkAdmin } = require('../middleware/auth');

// Apply auth and admin check to all routes
router.use(authMiddleware);
router.use(checkAdmin);

// Get all users with filters
router.get('/users', async (req, res) => {
  try {
    const { role, domain, year } = req.query;
    const filter = {};
    
    if (role) filter.role = role;
    if (domain) filter.domains = domain;
    if (year) filter.year = year;
    
    const users = await User.find(filter).select('-password');
    res.json({
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user role
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get analytics
router.get('/analytics', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    
    const domainStats = await User.aggregate([
      { $unwind: '$domains' },
      { $group: { _id: '$domains', count: { $sum: 1 } } }
    ]);
    
    const yearStats = await User.aggregate([
      { $group: { _id: '$year', count: { $sum: 1 } } }
    ]);
    
    res.json({
      totalUsers,
      totalStudents,
      totalAdmins,
      domainStats,
      yearStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
