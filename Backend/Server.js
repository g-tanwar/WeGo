require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./src/config/db');

// Models
const District = require('./src/models/District');
const Message = require('./src/models/Message');
const User = require('./src/models/User');
const Group = require('./src/models/Group');

// Routes
const authRoutes = require('./src/routes/auth');
const doubtRoutes = require('./src/routes/doubts');
const groupRoutes = require('./src/routes/groups');
const userRoutes = require('./src/routes/users');

// Connect to DB
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all for now, lock down in prod
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doubts', doubtRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/users', userRoutes);

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_district', async (districtId) => {
    socket.join(`district_${districtId}`);
    console.log(`User ${socket.id} joined district_${districtId}`);

    // Optional: Emit previous messages here if needed, or let client fetch via API
  });

  socket.on('send_message', async (data) => {
    // data: { districtId, userId, content, username }
    try {
      const { districtId, userId, content, username } = data;

      const newMessage = await Message.create({
        content,
        user: userId,
        district: districtId
      });

      const messageToSend = {
        _id: newMessage._id,
        content: newMessage.content,
        userId: userId,
        username: username,
        districtId: districtId,
        createdAt: newMessage.createdAt
      };

      io.to(`district_${districtId}`).emit('receive_message', messageToSend);
    } catch (e) {
      console.error('Error saving message:', e);
    }
  });

  // Group Chat Logic
  socket.on('join_group', async (groupId) => {
    socket.join(`group_${groupId}`);
    console.log(`User ${socket.id} joined group_${groupId}`);
  });

  socket.on('leave_group', async (groupId) => {
    socket.leave(`group_${groupId}`);
    console.log(`User ${socket.id} left group_${groupId}`);
  });

  socket.on('send_group_message', async (data) => {
    // data: { groupId, userId, content, username }
    try {
      const { groupId, userId, content, username } = data;

      // Check membership
      const group = await Group.findById(groupId);
      if (!group || !group.members.some(m => m.toString() === userId)) {
        return console.log(`Unauthorized message attempt in group ${groupId}`);
      }

      const newMessage = await Message.create({
        content,
        user: userId,
        group: groupId
      });

      const messageToSend = {
        _id: newMessage._id,
        content: newMessage.content,
        userId: userId,
        username: username,
        groupId: groupId,
        createdAt: newMessage.createdAt
      };

      io.to(`group_${groupId}`).emit('receive_group_message', messageToSend);
    } catch (e) {
      console.error('Error saving group message:', e);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Simple protected test route
const jwt = require('jsonwebtoken');
// Middleware for simple token check (inline for now or import)
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'You reached a protected route', userId: req.user.id });
});

// Get all districts
app.get('/api/districts', async (req, res) => {
  try {
    const districts = await District.find();
    res.json(districts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get single district
app.get('/api/districts/:id', async (req, res) => {
  try {
    const district = await District.findById(req.params.id);
    if (!district) return res.status(404).json({ error: 'District not found' });
    res.json(district);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get messages for a district
app.get('/api/districts/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ district: id })
      .populate('user', 'username')
      .sort({ createdAt: 1 }); // Oldest first
    res.json(messages);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 5000;

// Seeding function
const seedDistricts = async () => {
  try {
    const count = await District.countDocuments();
    if (count === 0) {
      await District.insertMany([
        { name: 'Town Square', description: 'General discussion for all citizens', icon: '🏰' },
        { name: 'Tech Tower', description: 'Coding, engineering and hardware', icon: '💻' },
        { name: 'Arts District', description: 'Design, music, and writing', icon: '🎨' },
        { name: 'Marketplace', description: 'Career advice and opportunities', icon: '💼' }
      ]);
      console.log('Seeded districts');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

server.listen(PORT, async () => {
  await seedDistricts();
  console.log(`Server running on port ${PORT}`);
});
