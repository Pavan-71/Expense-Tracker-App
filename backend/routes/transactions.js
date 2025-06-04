const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET: Fetch all transactions sorted by most recent
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST: Create a new transaction
router.post('/', async (req, res) => {
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
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error('Error saving transaction:', err.message);
    res.status(400).json({ message: 'Failed to save transaction' });
  }
});

// DELETE: Remove a transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting transaction:', err.message);
    res.status(500).json({ message: 'Failed to delete transaction' });
  }
});

// PUT: Update a transaction by ID
router.put('/:id', async (req, res) => {
  const { amount, category, type, date, description } = req.body;

  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
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
