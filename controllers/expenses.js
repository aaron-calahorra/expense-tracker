const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('expenses').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res, next) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('expenses')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }  
};
  
const createExpense = async (req, res) => {
    try {
      const contact = {
        description: req.body.description,
        total: req.body.total,
        type: req.body.type,
        date: req.body.date,
        account: req.body.account
      };
      const response = await mongodb.getDb().db().collection('expenses').insertOne(contact);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the expense.');
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createExpense
};