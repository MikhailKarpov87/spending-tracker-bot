const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

require('./models/User');
require('./models/Operation');

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected'))
  .catch(err => console.log('Caught', err.stack));

require('./services/bot');

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['temporary-key'],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/operationRoutes')(app);
require('./routes/userRoutes')(app);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
