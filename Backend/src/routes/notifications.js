const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { authenticate } = require('../middleware/auth');

// GET /api/notifications - Get all notifications for current user
router.get('/', authenticate, async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .populate('sender', 'username')
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(notifications);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// POST /api/notifications/:id/read - Mark notification as read
router.post('/:id/read', authenticate, async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, recipient: req.user.id },
            { read: true },
            { new: true }
        );
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.json(notification);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// POST /api/notifications/read-all - Mark all as read
router.post('/read-all', authenticate, async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user.id, read: false },
            { read: true }
        );
        res.json({ message: 'All notifications marked as read' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
