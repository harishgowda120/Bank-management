const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const BankAccount = require('../models/BankAccount');

const protect = require('../middleware/authMiddleware');
const router = express.Router();

// POST request to register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST request to login an existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET request to fetch all users (protected route)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/All', async (req, res) => {
  try {
    // Fetch the bank account by ID and ensure it belongs to the logged-in user
    const account = await BankAccount.find();

    // If the account is not found
    if (!account) {
      return res.status(404).json({ message: 'Bank account not found.' });
    }

    // Return the found account
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
