const express = require('express');
const router = express.Router();

const {
    getAllTransactions
} = require('../controllers/balanceChecker.controllers');

router.get('/total_balance', getAllTransactions);
// router.post('/login', login);

module.exports = router;