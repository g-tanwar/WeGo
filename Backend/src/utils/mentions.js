const User = require('../models/User');
const { createNotification } = require('./notifications');

const processMentions = async (text, senderId, link, sourceType = 'post') => {
    try {
        // Regex to find @username (alphanumeric, underscores, 3-20 chars - adjust as needed)
        // Note: The user mentioned no spaces, so [^\s]+ or \w+ is good.
        const mentionRegex = /@(\w+)/g;
        const matches = [...text.matchAll(mentionRegex)];

        if (matches.length === 0) return [];

        const usernames = [...new Set(matches.map(match => match[1]))]; // Unique usernames

        // Find users in DB
        const users = await User.find({ username: { $in: usernames } });

        // Filter out sender from the valid users found for both storage and notification
        const validOtherUsers = users.filter(u => u._id.toString() !== senderId.toString());
        const userIds = validOtherUsers.map(u => u._id);

        for (const user of validOtherUsers) {
            await createNotification({
                recipient: user._id,
                sender: senderId,
                type: 'mention',
                content: `mentioned you in a ${sourceType}`,
                link: link
            });
        }

        return userIds;
    } catch (error) {
        console.error('Error processing mentions:', error);
        return [];
    }
};

module.exports = { processMentions };
