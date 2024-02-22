

const login = async (req, res) => {
  res.send(`<a href="/auth/google"> Authentication with Google</a>`);
}

const callback = async (req, res) => {
  res.send(`Hello ${req.user.displayName}!`);
}

const protectedRoute = async (req, res) => {
  res.send(`Hello ${req.user.displayName}!`);
}

const failure = async (req, res) => {
  res.send('Failed to authenticate..');
}

const logout = async (req, res) => {
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
}

module.exports = {
  login,
  callback,
  protectedRoute,
  failure,
  logout
};
