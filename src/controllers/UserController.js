const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');


module.exports = {
    get: async () => {
        return User.find({});
    },

    login: async (request) => {

        const error = {
            error: true,
            message: 'Essas credenciais não correspondem aos nossos registros.'
        };

        const user = await User.findOne({ email: request.email });
        
        
        if (!user) {
            return error;
        }

        const compare = await bcrypt.compare(request.password, user.password);

        if (!compare) {
            return error;
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
        }, 'secret', { expiresIn: '1h' });

        return {
            status: 200,
            token: token,
            user: user
        };

    },

    register: async (request) => {

        let user = await User.findOne({ email: request.email });

        if (user !== null) {
            return {
                error: true,
                message: 'Este email já está sendo utilizado.'
            }
        }

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(request.password, salt);
        
        user = new User({
            name: request.name,
            email: request.email,
            password: hash
        });

        await user.save();

        return user;
    }
};