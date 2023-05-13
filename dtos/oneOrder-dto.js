module.exports = class OneOrderDto{
    id;
    productOrders;
    constructor(model) {
        this.id = model.id
        if(model.product_orders[0]) this.productOrders = model.product_orders.map(position=>{
            let img = ''
            if(position.product.img_for_catalogs[0]){
                img = position.product.img_for_catalogs[0].src
            }

            return{
                count: position.count,
                name: position.product.name,
                productId: position.product.id,
                cost: position.count*position.product.price,
                img
            }
        })
    }


}