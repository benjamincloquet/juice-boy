const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('./services/session');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  app.use(morgan('dev'));
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build'));
  });
}
require('./services/passport');
require('./database');

app.use(require('./connectedToDatabase'));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('body-parser').json());
app.use('/api', require('./routes'));

require('./services/discord');

app.listen(process.env.PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});
