const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check for empty fields
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find user in database
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Basic Password Check (For better security, hashing should be used)
    if (user.password !== password) {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT Token with stronger security practices
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'secretkey', // Use .env variable for security
        { expiresIn: '2h' }
    );

    // Send token and role back to the client
    res.status(200).json({ 
        message: 'Login successful.', 
        token, 
        role: user.role 
    });
});

module.exports = router;
