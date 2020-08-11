const Product = require('../models/Product');
const Category = require('../models/Category');
const { Schema } = require('mongoose');

module.exports = {
    get: async (request) => {
        request.page = parseInt(request.page);
        request.limit = parseInt(request.limit);
        request.min = parseInt(request.min);
        request.max = parseInt(request.max);
        request.gender = parseInt(request.gender);

        const categories = [];

        console.log(request);

        if(request.category === undefined) {
            request.category = await Category.find({});

            request.category.forEach((category) => {
                categories.push(category._id);
            });

        } else {
            categories.push(request.category);
        }

        const result = await Product.paginate({
            price: { $gte: request.min, $lte: request.max },
            gender: (request.gender > 0) ? request.gender : { $gt: 0 },
            category: { $in: categories }
        }, { page: request.page, limit: request.limit, populate: 'category' });
        

        return result;
    },

    getById: (id) => {
        return Product.findById(id);
    },

    store: (request) => {
        const product = new Product(request);
        product.save()
        return true;
    },

    destroy: (id) => {
        return Product.findByIdAndRemove(id);
    }
};