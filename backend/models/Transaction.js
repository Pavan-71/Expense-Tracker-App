const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {  // 'income' or 'expense'
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
