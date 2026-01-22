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
        required: true
    },
    // Optional param from old schema, keeping for compatibility if needed, though likely unused
    param: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
