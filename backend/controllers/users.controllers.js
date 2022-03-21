const User = require('../models/users.models');
const BalanceChecker = require('../models/balanceChecker.models');
const { decrypt, encrypt, createToken } = require('../utils/index.js');

class userController {
    async register(req, res) {
        try {
            const checkUser = await User.findOne({ email: req.body.email });
            if( checkUser ) {
                return res.status(400).json({ statusCode: 400, msg: 'email already registered' });
            } else {
                const createBalance = await BalanceChecker.create({ description: '' });

                let { name, email, password } = req.body;
                
                password = encrypt(password);
                const newUser = await User.create({ name, email, password, balanceData: createBalance });

                await BalanceChecker.findOneAndUpdate({ _id: newUser.balanceData[0]._id }, { user_id: newUser._id }, { new: true });

                const data = await User.findOne({ email: newUser.email }).select(['-_id', '-id', '-deleted', '-createdAt', '-updatedAt', '-password', '-balanceData']).populate('balanceData');

                res.status(200).json({ statusCode: 200, msg: 'successfully created your Account!', data: data });
            }
        } catch (error) {
            res.status(500).json({ statusCode: 500, msg: 'Internal server error' });
        }
    }

    async login(req, res) {
        try {
            const checkUser = await User.findOne({ email: req.body.email });
            if (!checkUser) {
                return res.status(404).json({ statusCode: 404, msg: 'this Account has not been registered' });
            }
            const validatePassword = decrypt(req.body.password, checkUser.password);
            if (!validatePassword) {
                return res.status(400).json({ statusCode: 400, msg: 'you entered invalid password' });
            }

            let { name, email } = checkUser;

            const data = {
                name, email
            }

            const userToken = createToken(data);
            
            const resData = await User.findOneAndUpdate({ email: checkUser.email }, { token: userToken }, { new: true });

            const result = await User.findOne({ email: resData.email }).populate({ path: 'balanceData' }).select(['-_id', '-id', '-deleted', '-createdAt', '-updatedAt', '-password']);

            res.status(200).json({ statusCode: 200, msg: 'login success!', token: result.token });
        } catch (error) {
            res.status(500).json({ statusCode: 500, msg: 'Internal server error!' })
        }
    }
}

module.exports = new userController();

