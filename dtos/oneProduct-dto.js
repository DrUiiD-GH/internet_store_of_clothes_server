module.exports = class OneProductsDto{
    name;
    price;
    subcategory;
    description;
    info;
    imgs;

    constructor(model) {
        this.name = model.dataValues.name
        this.price = model.dataValues.price
        this.subcategory = model.subcategory.name
        this.description = model.product_description.description
        this.info = model.product_infos
        this.imgs = model.img_for_catalogs.map(img=>{
            return {
                id:img.id,
                src:img.src
            }
        })
    }

}