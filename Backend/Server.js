require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./src/models');
const authRoutes = require('./src/routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// simple protected test route
const { authenticate } = require('./src/middleware/auth');
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'You reached a protected route', userId: req.user.id });
});

const PORT = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

sequelize.sync() // in prod, prefer migrations; sync({ alter:true }) optionally during dev
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
