const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed, role: role || 'student' });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const reqId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const startedAt = Date.now();
  try {
    const { email, password } = req.body;
    console.log(`[AUTH][LOGIN][${reqId}] hit email=${email ?? '(missing)'} ip=${req.ip}`);
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    const t0 = Date.now();
    const user = await User.findOne({ email });
    const t1 = Date.now();
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const t2 = Date.now();
    const ok = await bcrypt.compare(password, user.password);
    const t3 = Date.now();
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    console.log(
      `[AUTH][LOGIN][${reqId}] ok total=${Date.now() - startedAt}ms db=${t1 - t0}ms bcrypt=${t3 - t2}ms`
    );
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error(`[AUTH][LOGIN][${reqId}] error total=${Date.now() - startedAt}ms`, err);
    res.status(500).json({ error: 'Internal error' });
  }
});

module.exports = router;
