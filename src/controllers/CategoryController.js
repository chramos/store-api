const Category = require('../models/Category');

module.exports = {
    get: (request) => {

        // if (request.name !== undefined) {
        //     const regex = RegExp(["^", request.name, "$"].join(""), "i");
        //     return Category.find({
        //         name: regex
        //     });
        // }
        
        return Category.find({});
        
    },
    store: (request) => {
        const category = new Category(request);
        category.save()
        return true;
    }
};