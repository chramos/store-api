const Category = require('../models/Category');

module.exports = {
    get: (request) => {
        if (request.name !== undefined) {
            return Category.findOne({ name: { $regex: RegExp("^" + request.name, "i") } });
        }

        return Category.find({});
        
    },
    store: (request) => {
        const category = new Category(request);
        category.save()
        return true;
    }
};