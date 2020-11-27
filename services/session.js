const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = session({
  secret: process.env.SESSION_SECRET || 'abc123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: Number(process.env.COOKIE_MAX_AGE) },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
});
