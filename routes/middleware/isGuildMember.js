const { isGuildMember } = require('../../services/discord');

module.exports = (req, res, next) => {
  if (req.isAuthenticated() && isGuildMember(req.user.id)) {
    next();
  } else {
    res.sendStatus(401);
  }
};
