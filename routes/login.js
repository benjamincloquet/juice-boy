const passport = require('passport');
const isAuthenticated = require('./middleware/isAuthenticated');
const isGuildMember = require('./middleware/isGuildMember');

module.exports = (router) => {
  router.get('/login', passport.authenticate('discord'));

  router.get('/login/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/api/user');
  });

  router.get('/user', isAuthenticated, isGuildMember, (req, res) => {
    res.status(200).send('Welcome!');
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });
};
