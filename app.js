const express = require('express');
// Session Express 
const session = require('express-session');

const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

// Authentication ***********
require('./utilities/auth')
const passport = require('passport');
// **********************


const port = process.env.PORT || 8080;
const app = express();

// User session: (Secret should probably be an env variable)
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));


// *********************************************
// This is to test the error handler below. Un comment it to use it. (It works :D)
// app.get('/error', (req, res) => {
//   throw new Error('This is an intentional uncaught exception');
// });
// *********************************************


// Authentication Oauth with GOOGLE **********************

// Login Function that checks if someone is logged in or not
// This is considered Middleware
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401)
}
// End Login Function
app.get('/', (req, res) => {
  res.send('<a href="/auth/google"> Authentication with Google</a>');
});

app.get('/auth/google', 
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}!`);
})

app.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session:', err);
        return res.sendStatus(500);
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.send('Logged out successfully');
    });
  });
});

// **********************





process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`)
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
