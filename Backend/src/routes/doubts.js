const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubt');
const { authenticate } = require('../middleware/auth');
const { createNotification } = require('../utils/notifications');

// POST /api/doubts - Create a new doubt
router.post('/', authenticate, async (req, res) => {
    try {
        const { title, description, tags } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const newDoubt = await Doubt.create({
            title,
            description,
            tags: tags || [],
            author: req.user.id // Taken from the token payload
        });

        // Populate author details for the response
        await newDoubt.populate('author', 'username');

        res.status(201).json(newDoubt);
    } catch (error) {
        console.error('Error creating doubt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/doubts - List all doubts
router.get('/', async (req, res) => {
    try {
        const { tag, sort } = req.query;

        let query = {};
        if (tag) {
            query.tags = { $in: [new RegExp(`^${tag}$`, 'i')] };
        }

        let doubts = await Doubt.find(query, 'title description tags upvotes answers createdAt author')
            .populate('author', 'username')
            .populate('answers.author', 'username');

        // Sorting logic
        if (sort === 'upvoted') {
            doubts.sort((a, b) => b.upvotes.length - a.upvotes.length);
        } else if (sort === 'answered') {
            doubts.sort((a, b) => b.answers.length - a.answers.length);
        } else {
            // Default: recent
            doubts.sort((a, b) => b.createdAt - a.createdAt);
        }

        res.json(doubts);
    } catch (error) {
        console.error('Error fetching doubts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/doubts/:id - Get a single doubt
router.get('/:id', async (req, res) => {
    try {
        const doubt = await Doubt.findById(req.params.id)
            .populate('author', 'username')
            .populate('answers.author', 'username');

        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        // Sort answers: Accepted answer first, then most upvotes, then newest
        doubt.answers.sort((a, b) => {
            if (doubt.acceptedAnswer) {
                if (a._id.toString() === doubt.acceptedAnswer.toString()) return -1;
                if (b._id.toString() === doubt.acceptedAnswer.toString()) return 1;
            }
            const upvotesA = a.upvotes ? a.upvotes.length : 0;
            const upvotesB = b.upvotes ? b.upvotes.length : 0;
            if (upvotesA !== upvotesB) return upvotesB - upvotesA;
            return b.createdAt - a.createdAt;
        });

        res.json(doubt);
    } catch (error) {
        console.error('Error fetching doubt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/doubts/:id/answer - Answer a doubt
router.post('/:id/answer', authenticate, async (req, res) => {
    try {
        const { content } = req.body;
        const { id } = req.params;

        if (!content) {
            return res.status(400).json({ error: 'Answer content is required' });
        }

        const doubt = await Doubt.findById(id);
        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        const newAnswer = {
            content,
            author: req.user.id
        };

        doubt.answers.push(newAnswer);
        await doubt.save();

        // Create Notification for doubt author
        await createNotification({
            recipient: doubt.author,
            sender: req.user.id,
            type: 'answer',
            content: `answered your doubt: "${doubt.title.substring(0, 30)}${doubt.title.length > 30 ? '...' : ''}"`,
            link: `/dashboard/doubts/${id}`
        });

        // Return the updated doubt with populated fields
        await doubt.populate('author', 'username');
        await doubt.populate('answers.author', 'username');

        res.json(doubt);
    } catch (error) {
        console.error('Error answering doubt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/doubts/:id/upvote - Toggle upvote on a doubt
router.post('/:id/upvote', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const doubt = await Doubt.findById(id);
        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        // Check if already upvoted
        const index = doubt.upvotes.indexOf(userId);
        if (index === -1) {
            // Not upvoted -> Upvote
            doubt.upvotes.push(userId);

            // Create Notification
            await createNotification({
                recipient: doubt.author,
                sender: userId,
                type: 'upvote',
                content: `upvoted your doubt: "${doubt.title.substring(0, 30)}${doubt.title.length > 30 ? '...' : ''}"`,
                link: `/dashboard/doubts/${id}`
            });
        } else {
            // Already upvoted -> Remove upvote
            doubt.upvotes.splice(index, 1);
        }

        await doubt.save();

        // Populate before returning
        await doubt.populate('author', 'username');
        await doubt.populate('answers.author', 'username');

        res.json(doubt);
    } catch (error) {
        console.error('Error upvoting doubt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/doubts/:id/answers/:answerId/upvote - Toggle upvote on an answer
router.post('/:id/answers/:answerId/upvote', authenticate, async (req, res) => {
    try {
        const { id, answerId } = req.params;
        const userId = req.user.id;

        const doubt = await Doubt.findById(id);
        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        const answer = doubt.answers.id(answerId);
        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        // Check if already upvoted
        const index = answer.upvotes.indexOf(userId);
        if (index === -1) {
            // Not upvoted -> Upvote
            answer.upvotes.push(userId);

            // Create Notification
            await createNotification({
                recipient: answer.author,
                sender: userId,
                type: 'upvote',
                content: `upvoted your answer in "${doubt.title.substring(0, 30)}${doubt.title.length > 30 ? '...' : ''}"`,
                link: `/dashboard/doubts/${id}`
            });
        } else {
            // Already upvoted -> Remove upvote
            answer.upvotes.splice(index, 1);
        }

        await doubt.save();

        // Populate before returning
        await doubt.populate('author', 'username');
        await doubt.populate('answers.author', 'username');

        res.json(doubt);
    } catch (error) {
        console.error('Error upvoting answer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/doubts/:id/accept/:answerId - Accept an answer
router.post('/:id/accept/:answerId', authenticate, async (req, res) => {
    try {
        const { id, answerId } = req.params;
        const userId = req.user.id;

        const doubt = await Doubt.findById(id);
        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        // Rule: Only the doubt author can mark accepted
        if (doubt.author.toString() !== userId) {
            return res.status(403).json({ error: 'Only the author of the doubt can accept an answer' });
        }

        // Verify that the answer exists within this doubt
        const answer = doubt.answers.id(answerId);
        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        // Logic: Set as accepted.
        const isCurrentlyAccepted = doubt.acceptedAnswer && doubt.acceptedAnswer.toString() === answerId;

        if (isCurrentlyAccepted) {
            doubt.acceptedAnswer = null; // Toggle off if already accepted
        } else {
            // Strict check: Prevent accepting if another one is already accepted
            if (doubt.acceptedAnswer) {
                return res.status(400).json({ error: 'Another answer is already accepted. Please unaccept it first.' });
            }
            doubt.acceptedAnswer = answerId;

            // Create Notification
            await createNotification({
                recipient: answer.author,
                sender: userId,
                type: 'accept',
                content: `accepted your answer for: "${doubt.title.substring(0, 30)}${doubt.title.length > 30 ? '...' : ''}"`,
                link: `/dashboard/doubts/${id}`
            });
        }

        await doubt.save();

        // Return updated doubt with populated fields
        await doubt.populate('author', 'username');
        await doubt.populate('answers.author', 'username');

        // Note: acceptedAnswer is an ObjectId reference to a subdocument.
        // It's already part of the doubt object returned.
        res.json(doubt);
    } catch (error) {
        console.error('Error accepting answer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
