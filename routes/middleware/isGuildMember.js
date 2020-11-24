const { isGuildMember } = require('../../services/discord');

module.exports = (req, res, next) => {
  if (isGuildMember(req.user.id)) {
    next();
  } else {
    res.sendStatus(401);
  }
};
