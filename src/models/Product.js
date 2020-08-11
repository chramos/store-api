const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    images: { type: Array },
    price: { type: Number, required: true },
    gender: { type: Number, required: true },
    category: { type: Schema.ObjectId, ref: 'categories' },
    offers: { type: Boolean, default: false },
    old_price: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    active: { type: Boolean, default: true },
    sizes: { type: Array, required: true },
    description: { type: String }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('products', productSchema);