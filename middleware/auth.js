const jwt = require('jsonwebtoken');
const generateSecret = require('../utilities/generateSecret')

const secret = process.env.SESSION_SECRET || generateSecret()


const isAuthenticated = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;

        // Validate the Bearer Token
        jwt.verify(bearerToken, secret, (err, decoded) => {
            if (err) {
                res.status(403).send('Invalid token');
            } else {
                // Token is valid, you can proceed to the next middleware
                // or route handler
                req.decodedToken = decoded;
                next();
            }
        });
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = {
    isAuthenticated
}