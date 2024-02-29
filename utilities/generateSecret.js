const crypto = require('crypto');

const generateSecret = crypto.randomBytes(32).toString('hex');
console.log('Session secret:', generateSecret);

module.exports = generateSecret;
