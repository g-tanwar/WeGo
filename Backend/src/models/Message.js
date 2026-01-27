const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: false
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: false
    },
    param: {
        type: String
    },
    mediaUrl: {
        type: String,
        required: false
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
