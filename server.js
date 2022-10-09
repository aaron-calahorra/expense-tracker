const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const session = require('express-session');
const passport = require('passport');
// const auth = require('./auth');

const port = process.env.PORT || 8080;
const app = express();



// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google"> Log in with Google</a>');
// });

app
.use(session({ secret: 'cats' }))
.use(passport. initialize())
.use(passport.session())
.use(bodyParser.json())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})
.use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
if (err) {
  console.log(err);
} else {
  app.listen(port);
  console.log(`Connected to DB and listening on ${port}`);
}
});