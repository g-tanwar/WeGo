const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const isVideo = file.mimetype.startsWith('video');
        return {
            folder: 'wego_media',
            resource_type: isVideo ? 'video' : 'image',
            format: isVideo ? 'mp4' : undefined, // Force mp4 for videos
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
        };
    },
});

// File filter to restrict types
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/mp4')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and MP4 videos are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    }
});

module.exports = upload;
