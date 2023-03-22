const {Type} = require("../models/models");

class TypeController{
    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
    }
}
module.exports = new TypeController()
//ready