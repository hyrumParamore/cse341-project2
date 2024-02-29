
const isAuthenticated = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        // This is where you would validate the bearer token, but for now I am just going to
            // assume that the token is valid. It makes it easier to work with right now.
        // Also I was having a ton of issue trying to get the token from the header
            // to then use to validate it.
        return next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = {
    isAuthenticated
}