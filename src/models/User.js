const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rememberToken: { type: String, default: null }
});

// userSchema.methods.generateJWT = () => {
//     const today = new Date();
//     const expires = new Date(today);

//     expires.setDate(today.getDay() + 60);

//     return jwt.sign({
//         email: this.email,
//         id: this._id,
//         expires: parseInt(expires.getDate() / 1000, 10)
//     }, 'secret');
// }

// userSchema.methods.toAuthJSON = () => {
//     return {
//         _id: userSchema._id,
//         email: userSchema.get('email'),
//         token: userSchema.methods.generateJWT(),
//     };
// }
module.exports = mongoose.model('users', userSchema);