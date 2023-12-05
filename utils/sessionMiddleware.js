module.exports = (req, res, next) => {
    // Check if the session cookie exists and if it's expired
    if (req.session && req.session.cookie && req.session.cookie.expires < Date.now()) {
      // Session expired, redirect to login page
      return res.redirect('/login');
    }
    // Continue to the next middleware
    next();
  };