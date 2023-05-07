module.exports = class ProductsDto {
    count;
    rows;

    constructor(model) {
        this.count = model.count
        this.rows = model.rows.map(line => {
            return {
                id: line.id,
                name: line.name,
                price: line.price,
                subcategoryName: line.subcategory.name,
                img: line.img_for_catalogs[0]
            }
        })

    }
}