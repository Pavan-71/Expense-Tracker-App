const express = require('express');
const router = express.Router();
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');

router.put('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { username, email, phone } = req.body;

    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing && existing._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
