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
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid expense id to find a expense.');
      } else {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('expenses')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      })};
    } catch (err) {
      res.status(500).json({ message: err.message });
    }  
};
  
const createExpense = async (req, res) => {
    try {
      const expense = {
        description: req.body.description,
        total: req.body.total,
        type: req.body.type,
        date: req.body.date,
        account: req.body.account
      };
      const response = await mongodb.getDb().db().collection('expenses').insertOne(expense);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the expense.');
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const updateExpense = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid expense id to find a expense.');
    } else {
    const userId = new ObjectId(req.params.id);
    const expense = {
      description: req.body.description,
      total: req.body.total,
      type: req.body.type,
      date: req.body.date,
      account: req.body.account
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('expenses')
      .replaceOne({ _id: userId }, expense);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the expense.');
    }};
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid expense id to find a expense.');
    } else {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('expenses').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the expense.');
    }};
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createExpense,
  updateExpense,
  deleteExpense
};