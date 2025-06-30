const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const protect = require('../middleware/authMiddleware');

// 🔐 GET user’s transactions
router.get('/', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 🔐 ADD transaction
router.post('/', protect, async (req, res) => {
  const { amount, category, type, date, description } = req.body;

  if (!amount || !category || !type) {
    return res.status(400).json({ message: 'Amount, category, and type are required.' });
  }

  const transaction = new Transaction({
    amount,
    category,
    type,
    date: date || Date.now(),
    description: description || '',
    user: req.user.id, // ✅ Link to user
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error('Error saving transaction:', err.message);
    res.status(400).json({ message: 'Failed to save transaction' });
  }
});

// 🔐 DELETE
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // ✅ Only allow user's own
    });

    if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting transaction:', err.message);
    res.status(500).json({ message: 'Failed to delete transaction' });
  }
});

// 🔐 UPDATE
router.put('/:id', protect, async (req, res) => {
  const { amount, category, type, date, description } = req.body;

  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // ✅ Must belong to user
      { amount, category, type, date, description },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Transaction not found' });

    res.json(updated);
  } catch (err) {
    console.error('Error updating transaction:', err.message);
    res.status(500).json({ message: 'Failed to update transaction' });
  }
});

module.exports = router;
