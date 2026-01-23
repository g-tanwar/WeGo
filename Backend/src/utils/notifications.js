const Notification = require('../models/Notification');

const createNotification = async ({ recipient, sender, type, content, link }) => {
    try {
        // Don't notify if the user is the recipient (e.g. upvoting own answer)
        if (recipient.toString() === sender.toString()) return;

        const notification = await Notification.create({
            recipient,
            sender,
            type,
            content,
            link
        });
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};

module.exports = { createNotification };
