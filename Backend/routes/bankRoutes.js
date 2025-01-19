const express = require('express');
const BankAccount = require('../models/BankAccount');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Add Bank Account
router.post('/AddAck', protect, async (req, res) => {
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
  try {
    const bankAccount = await BankAccount.create({
      user: req.user._id,
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    });
    res.status(201).json(bankAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// View All Accounts - Protected Route
router.get('/', protect, async (req, res) => {
  try {
    // The userId is extracted from the JWT token in the 'protect' middleware
    const accounts = await BankAccount.find({ user: req.user._id }); // Fetch accounts based on userId

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ message: 'No bank accounts found.' });
    }

    res.status(200).json(accounts); // Return the found accounts
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any server errors
  }
});

// Get Bank Account by ID
router.get('/:id', protect, async (req, res) => {
  try {
    // Find the bank account by its ID
    const account = await BankAccount.findById(req.params.id);

    // If the account doesn't exist, return a 404 error
    if (!account) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    // If the account exists, return the account details
    res.status(200).json(account);
  } catch (error) {
    // If there is an error (e.g. invalid ID format), return a 500 error
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

// Edit Bank Account
router.put('/:id', protect, async (req, res) => {
  try {
    const account = await BankAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Bank Account
router.delete('/:id', protect, async (req, res) => {
  try {
    await BankAccount.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
