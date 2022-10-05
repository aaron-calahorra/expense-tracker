const router = require('express').Router();
const expense = require('./expenses');
const auth = require('./auth');
const passport = require('passport');

router.use('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
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