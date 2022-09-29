const router = require('express').Router();
const expense = require('./expenses');

router.use('/', require('./swagger'));
router.use('/expenses', expense);
router.use(
  '/',
  (docData = (req, res) => {
    let docData = "Hello world! Ready to keep records of your expenses?";
    res.send(docData);
  })
);

module.exports = router;