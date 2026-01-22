const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubt');
const { authenticate } = require('../middleware/auth');

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

// GET /api/doubts - List all doubts (newest first, optional tag filter)
router.get('/', async (req, res) => {
    try {
        const { tag } = req.query;

        let query = {};
        if (tag) {
            // Case-insensitive search inside the tags array
            query.tags = { $in: [new RegExp(`^${tag}$`, 'i')] };
        }

        const doubts = await Doubt.find(query, 'title description tags upvotes answers createdAt author')
            .sort({ createdAt: -1 }) // Newest first
            .populate('author', 'username') // Show who asked
            .populate('answers.author', 'username'); // Show who answered

        res.json(doubts);
    } catch (error) {
        console.error('Error fetching doubts:', error);
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

module.exports = router;
