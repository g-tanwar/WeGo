const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Doubt = require('../models/Doubt');
const Group = require('../models/Group');
const { authenticate } = require('../middleware/auth');

// GET /api/users/:username - Get public profile
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch Stats
        const doubtsCount = await Doubt.countDocuments({ author: user._id });

        // Count answers (This is a bit expensive if we have to scan all doubts, 
        // ideally we would simple aggregate or keep a counter, but for MVP aggregate is fine)
        // Mongoose doesn't support deep count on subdocs easily without aggregation
        // Let's do a basic aggregation to count answers by this user
        const answersCountResult = await Doubt.aggregate([
            { $unwind: '$answers' },
            { $match: { 'answers.author': user._id } },
            { $count: 'count' }
        ]);
        const answersCount = answersCountResult.length > 0 ? answersCountResult[0].count : 0;

        // Find groups where user is a member
        const groups = await Group.find({ members: user._id }).select('name description tags members');

        // Fetch Doubts Asked
        const doubtsAsked = await Doubt.find({ author: user._id })
            .sort({ createdAt: -1 })
            .limit(10);

        // Fetch Doubts Answered (where user contributed an answer)
        const doubtsAnswered = await Doubt.find({ 'answers.author': user._id })
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            ...user.toObject(),
            stats: {
                doubts: doubtsCount,
                answers: answersCount,
                groups: groups.length,
                followers: user.followers?.length || 0,
                following: user.following?.length || 0
            },
            groups,
            doubtsAsked,
            doubtsAnswered
        });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/users/profile - Update own profile
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { bio, skills } = req.body;

        // Update fields
        if (bio !== undefined) req.user.bio = bio;
        if (skills !== undefined) req.user.skills = skills;

        await req.user.save();

        res.json(req.user);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/users/:id/follow - Follow a user
router.post('/:id/follow', authenticate, async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        if (!targetUser) return res.status(404).json({ error: 'User not found' });

        if (targetUser._id.toString() === req.user.id) {
            return res.status(400).json({ error: 'Cannot follow yourself' });
        }

        if (targetUser.followers.includes(req.user.id)) {
            return res.status(400).json({ error: 'Already following' });
        }

        targetUser.followers.push(req.user.id);
        await targetUser.save();

        const currentUser = await User.findById(req.user.id);
        currentUser.following.push(targetUser._id);
        await currentUser.save();

        res.json({ message: 'Followed successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// POST /api/users/:id/unfollow - Unfollow a user
router.post('/:id/unfollow', authenticate, async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        if (!targetUser) return res.status(404).json({ error: 'User not found' });

        targetUser.followers = targetUser.followers.filter(id => id.toString() !== req.user.id);
        await targetUser.save();

        const currentUser = await User.findById(req.user.id);
        currentUser.following = currentUser.following.filter(id => id.toString() !== targetUser._id.toString());
        await currentUser.save();

        res.json({ message: 'Unfollowed successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
