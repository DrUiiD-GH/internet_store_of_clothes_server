const {Subcategory} = require("../models/models");

class SubcategoryController{
    async getAll(req, res){
        const subcategories = await Subcategory.findAll()
        return res.json(subcategories)
    }
}
module.exports = new SubcategoryController()
//ready