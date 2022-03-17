const User = require('../models/users.model');
const { decrypt, encrypt, createToken } = require('../utils/index.js');

class userController {
    async register(req, res) {
        try {
            const checkUser = await User.findOne({ email: req.body.email });
            if( checkUser ) {
                return res.status(400).json({ statusCode: 400, msg: 'email already registered' });
            } else {
                let { name, email, password } = req.body;
                
                password = decrypt(password);
                const newUser = await User.create({ name, email, password });

                const data = await User.findOne({ email: newUser.email }).select('-id').select('-createdAt').select('-updatedAt').select('-password');

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
            
            const resData = await User.findOneAndUpdate({ email: checkUser.email }, { token: userToken }, { new: true }).select('-id').select('-createdAt').select('-updatedAt').select('-password');;

            res.status(200).json({ statusCode: 200, msg: 'login success!', data: resData });
        } catch (error) {
            res.status(500).json({ statusCode: 500, msg: 'Internal server error!' })
        }
    }
}

module.exports = new userController();

