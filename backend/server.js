const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const transactionsRouter = require('./routes/transactions');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');  

app.use('/api/transactions', transactionsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);  

app.get('/', (req, res) => {
  res.send('🚀 Expense Tracker Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔊 Server started on port ${PORT} Successfully!`));
