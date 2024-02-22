
// Checks if the user is logged in.
const isLoggedIn = async (req, res, next) => {
    req.user ? next() : res.sendStatus(401)
}


module.exports = {
    isLoggedIn,
}