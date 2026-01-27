const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  skills: [{
    type: String
  }],
  domains: [{
    type: String,
    enum: ['coding', 'design', 'marketing', 'data science']
  }],
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th']
  },
  branch: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 500
  },
  profilePicture: {
    type: String,
    default: ''
  },
  portfolioLinks: {
    github: String,
    linkedin: String,
    portfolio: String
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
