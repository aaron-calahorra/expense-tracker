const express = require('express');
const router = express.Router();

const expensesController = require('../controllers/expenses');

router.get('/', expensesController.getAll);

router.get('/:id', expensesController.getSingle);

router.post('/', expensesController.createExpense);

module.exports = router;