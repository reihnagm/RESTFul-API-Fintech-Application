const express = require('express');
const transaction = require('./routes/transaction');
const Route = express.Router();
Route
    .use('/api/v1/transaction', transaction);
module.exports = Route;
