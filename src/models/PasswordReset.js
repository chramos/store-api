const mongoose = require('mongoose');
const { Schema } = mongoose;

const passwordResetSchema = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
});

module.exports = mongoose.model('password_resets', passwordResetSchema);