const express = require('express');
const Route = express.Router();
const Transaction = require('../controllers/transaction');
Route
    .get('/', Transaction.get_all)
    .post('/', Transaction.store);
module.exports = Route;
