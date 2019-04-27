const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const bcrypt = require('bcryptjs');
var crypto = require("crypto");
const jwt = require('jsonwebtoken');
const moment = require('moment');

const nodemailer = require("nodemailer");

const mail = require('../mail');


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
    },

    recover: async (request) => {
        const user = await User.findOne({ email: request.email });

        if (user === null) {
            return {
                error: true,
                message: 'Nenhuma conta foi encontrada com este email.'
            };
        }

        const token = crypto.randomBytes(16).toString('hex');

        let passwordReset = await PasswordReset.findOneAndDelete({ email: request.email });

        passwordReset = new PasswordReset({
            email: request.email,
            token: token
        });

        await passwordReset.save();
        
        user.rememberToken = token;

        await user.save();

        //==========================================================
        // Envio de Email
        //==========================================================
        let transporter = nodemailer.createTransport({
           service: 'gmail',
            auth: {
                user: 'chenrique.ramos12@gmail.com',
                pass: 'fh32aue2'
            }
        });

        let info = await transporter.sendMail({
            from: '"Loja Virtual" <suporte@loja-virtual.com>', // sender address
            to: request.email, // list of receivers
            subject: "Recuperar senha", // Subject line
            text: "Instruções para recuperar sua senha.", // plain text body
            html: mail.passwordResetTemplate(user, token) // html body
        });

        console.log("Message sent: %s", info.messageId);

        return {
            error: false,
            message: 'Um link de redefinição de senha foi enviado para seu e-mail. :)'
        };
    },

    recoverVerifyToken: async (request) => {
        const user = await User.findOne({ rememberToken: request.token });
        
        if (user === null) {
            return {
                error: true,
                message: 'Algo saiu errado. Se o problema persistir entre em contato com a administração.'
            }
        }

        if (user._id.toString() !== request.id) {
            return {
                error: true,
                message: 'Algo saiu errado. Se o problema persistir entre em contato com a administração.'
            }
        }

        const passwordReset = await PasswordReset.findOne({ token: request.token });

        if (passwordReset === null && user.rememberToken !== request.token) {
            return {
                error: true,
                message: 'Token inválido! Por favor, tente enviar o email de recuperação de senha novamente.'
            }
        }
        const created = moment(passwordReset._id.getTimestamp());
        const expires = moment(created).add(1, 'hours');
        const now = moment();

        if(now.diff(expires, 'minutes') > 0) {
            return {
                error: true,
                message: 'Token expirado! Por favor, reenvie o email de recuperação de senha novamente.'
            }
        }

        return {
            error: false
        }
    },

    changePassword: async (request) => {
        const user = await User.findOne({ _id: request.id, rememberToken: request.token });

        if (user === null) {
            return {
                error: true,
                message: 'Token inválido! Por favor, tente enviar o email de recuperação de senha novamente.'
            }
        }

        await PasswordReset.findOneAndDelete({ token: request.token });

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(request.values.password, salt);

        user.password = hash;

        user.rememberToken = "";

        await user.save();

        return {
            message: 'Senha alterada com sucesso!'
        };
    }
};