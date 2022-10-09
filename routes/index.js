const router = require('express').Router();
const expense = require('./expenses');
const auth = require('./auth');
const session = require('express-session');
const passport = require('passport');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
};

router.use('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.use('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);

router.use('/protected', isLoggedIn, (req, res) => {
  res.send(`This is a protected page ${req.user.displayName}.`);
});

router.use('/auth/failure', (req, res) => {
  res.send('Something went wrong.');
});

// router.use('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
//   req.session.destroy();
// });

router.use('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.use('/', require('./swagger'));
router.use('/expenses', expense);
router.use(
  '/',
  (docData = (req, res) => {
    let docData = 'Hello world! Expense Tracker App <a href="/auth/google"> Log in with Google</a>';
    res.send(docData);
  })
);

module.exports = router;