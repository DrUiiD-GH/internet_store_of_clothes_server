module.exports = class ProductsForConstructorDto {
    products;
    constructor(model) {
        this.products = model.products.map(product=>{
            let subcategoryName
            let imgModel
            let imgPreview
            if(product.subcategory) subcategoryName = product.subcategory.name
            if(product.img_for_constructor) imgModel = product.img_for_constructor.src
            if(product.img_for_catalogs.length>0) imgPreview = product.img_for_catalogs[0].src

            return{
                id:product.id,
                name:product.name,
                price:product.price,
                subcategoryName,
                imgModel,
                imgPreview
            }}
        )

    }
}