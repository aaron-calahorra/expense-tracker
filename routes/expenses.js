const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const expensesController = require('../controllers/expenses');

router.get('/', expensesController.getAll);

router.get('/:id', expensesController.getSingle);

router.post('/', validation.saveExpense, expensesController.createExpense);

router.put('/:id', validation.saveExpense, expensesController.updateExpense);

router.delete('/:id', expensesController.deleteExpense);

module.exports = router;