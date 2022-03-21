const User = require('../models/users.models');
const BalanceChecker = require('../models/balanceChecker.models');


class balanceCheckerController {
    async getAllTransactions(req, res) {
        try {
            const token = req.headers.authorization.replace("Bearer ", "");
            const currentUser = await User.findOne({ token });

            const checkBalance = await BalanceChecker.findOne({ user_id: currentUser._id });

            return console.log(checkBalance)
        } catch (error) {
            console.log(error)
        }
    }

    async incomeLog(req, res) {

    }

    async expenseLog(req, res) {

    }
}

module.exports = new balanceCheckerController();