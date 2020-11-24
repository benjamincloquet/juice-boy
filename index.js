const app = require('express')();
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('./services/session');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  app.use(morgan('dev'));
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
