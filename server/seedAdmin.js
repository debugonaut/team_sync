const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@mitaoe.ac.in' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const admin = new User({
      name: 'Admin',
      email: 'admin@mitaoe.ac.in',
      password: hashedPassword,
      studentId: 'ADMIN001',
      role: 'admin',
      branch: 'Administration',
      year: '4th'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@mitaoe.ac.in');
    console.log('Password: Admin@123');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
