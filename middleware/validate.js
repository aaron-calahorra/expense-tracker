const validator = require('../helpers/validate');

const saveExpense = (req, res, next) => {
  const validationRule = {
    description: 'required|string',
    total: 'required|numeric',
    type: 'required|string',
    date: 'required|string',
    account: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveExpense
};