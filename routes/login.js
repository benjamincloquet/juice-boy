const passport = require('passport');
const isGuildMember = require('./middleware/isGuildMember');

module.exports = (router) => {
  router.get('/login', passport.authenticate('discord'));

  router.get('/login/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/api/user');
  });

  router.get('/user', isGuildMember, (req, res) => {
    res.status(200).json(req.user);
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });
};
