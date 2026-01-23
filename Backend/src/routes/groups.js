const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const { authenticate } = require('../middleware/auth');
const { createNotification } = require('../utils/notifications');

// POST /api/groups - Create a new study group
router.post('/', authenticate, async (req, res) => {
    try {
        const { name, description, tags } = req.body;

        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        const group = await Group.create({
            name,
            description,
            tags: tags || [],
            creator: req.user.id,
            members: [req.user.id] // Creator is the first member
        });

        await group.populate('creator', 'username');

        res.status(201).json(group);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/groups - List all groups
router.get('/', authenticate, async (req, res) => {
    try {
        const groups = await Group.find()
            .populate('creator', 'username')
            .populate('members', 'username');
        res.json(groups);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET /api/groups/:id - Get single group
router.get('/:id', authenticate, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
            .populate('creator', 'username')
            .populate('members', 'username');
        if (!group) return res.status(404).json({ error: 'Group not found' });
        res.json(group);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// POST /api/groups/:id/join - Join a group
router.post('/:id/join', authenticate, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) return res.status(404).json({ error: 'Group not found' });

        if (group.members.includes(req.user.id)) {
            return res.status(400).json({ error: 'Already a member' });
        }

        group.members.push(req.user.id);
        await group.save();

        // Create Notification for group creator
        await createNotification({
            recipient: group.creator,
            sender: req.user.id,
            type: 'join',
            content: `joined your group: "${group.name}"`,
            link: `/dashboard/groups/${req.params.id}`
        });

        await group.populate('members', 'username');
        res.json(group);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// POST /api/groups/:id/leave - Leave a group
router.post('/:id/leave', authenticate, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) return res.status(404).json({ error: 'Group not found' });

        // Remove user from members
        group.members = group.members.filter(member => member.toString() !== req.user.id);

        await group.save();

        await group.populate('members', 'username');
        res.json(group);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET /api/groups/:id/messages - Get chat history for a group
router.get('/:id/messages', authenticate, async (req, res) => {
    try {
        const Message = require('../models/Message');
        const messages = await Message.find({ group: req.params.id })
            .populate('user', 'username')
            .sort({ createdAt: 1 });
        res.json(messages);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// DELETE /api/groups/:id - Delete a group
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) return res.status(404).json({ error: 'Group not found' });

        // Check if user is creator
        if (group.creator.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this group' });
        }

        await group.deleteOne();
        res.json({ message: 'Group deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
