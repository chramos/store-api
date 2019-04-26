const Category = require('../models/Category');

module.exports = {
    get: (request) => {
        return Category.find({
            name: (request.name !== undefined) ? 
            { $regex: RegExp("^" + request.name, "i") } : 
            { $regex: RegExp("^.", "i") }
        });
        
    },
    store: (request) => {
        const category = new Category(request);
        category.save()
        return true;
    }
};