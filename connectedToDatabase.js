const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.sendStatus(503);
  }
};
