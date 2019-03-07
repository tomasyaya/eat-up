'use strict';

module.exports = {
  requireAnon (req, res, next) {
    if (req.session.currentUser) {
      res.redirect('/');
      return;
    }
    next();
  },
  requireUser (req, res, next) {
    if (!req.session.currentUser) {
      res.redirect('/');
      return;
    }
    next();
  },
  requireFields (req, res, next) {
    const { username, password, name, email } = req.body;
    if (!password || !username || !email || !name) {
      req.flash('validation', 'You need to fill all the parameters');
      res.redirect(`/auth${req.path}`);
      return;
    }
    next();
  }
};
