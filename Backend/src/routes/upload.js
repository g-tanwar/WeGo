const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// POST /api/upload - Single file upload
router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.status(200).json({
            message: 'File uploaded successfully',
            url: req.file.path, // Cloudinary URL
            public_id: req.file.filename,
            resource_type: req.file.mimetype.startsWith('video') ? 'video' : 'image'
        });
    } catch (error) {
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

module.exports = router;
