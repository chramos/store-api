const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true },
    gender: { type: Number, default: 0 },
});

module.exports = mongoose.model('categories', categorySchema);