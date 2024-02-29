const express = require('express');
const session = require('express-session');
const passport = require('passport');

// const authController = require('../controllers/auth');
// const authMiddleware = require('../middleware/auth')
const generateSecret = require('../utilities/generateSecret')

const router = express.Router();

// I currently don't have a SESSION_SECRET because I don't know if it is really necessary right now.
// So I have a function that will create a new one every session.
const secret = process.env.SESSION_SECRET || generateSecret()
// const secret = 'cat';


router.use(session({ secret: secret, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

// router.get('/', (req, res) => {
//   res.send('<a href="/auth/google"> Authentication with Google</a>');
// });

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/google/failure' // Redirect to login page if authentication fails
}), (req, res) => {
  res.redirect('/'); // Redirect to profile page upon successful authentication
});


// router.get('/profile', (req, res) => {
//   res.send(req.user); // Access user information from req.user
// });

// router.get('/google/callback', passport.authenticate('google', {
//   successRedirect: '/api-docs',
//   failureRedirect: '/auth/google/failure'
// }));

// // This route contains middleware (isLoggedIn) in order to access. If that login fails, it will reroute 
// // you to a different page.
// router.get('/protected', authMiddleware.isLoggedIn, authController.protectedRoute);

// router.get('/google/failure', authController.failure);

// router.get('/logout', authController.logout);

module.exports = router; 
