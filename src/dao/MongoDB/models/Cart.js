import { ManagerMongoDB } from "../../../db/managerMongoDB.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    products: [{
        id_prod: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }]
})

class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "cart", cartSchema)
    }

    async addProductCart(id, idProd, cant) {
        super.setConnection()
        const cart = await this.model.findById(id)
        cart.products.push({ id_prod: idProd, quantity: cant })
        return cart.save()
    }

    async getProductsCart() {
        super.setConnection()
        const prods = await this.model.find().populate("products.id_prod")
        return prods
    }

    async deleteProductCart(id) {
        super.setConnection()
        const cart = await this.model.findById(id)
        cart.products.filter(prod => prod._id != id)
        cart.save()
        return true
    }

    async deleteProductsCart(id) {
        super.setConnection()
        const cart = await this.model.findById(id)
        cart.products = []
        cart.save()
        return true
    }

    async updateProductCart(id, ...propiedades) {
        super.setConnection()
        const cart = await this.model.findById(id)
        const aux = { ...propiedades }
        cart.products.findIndex(prod => prod._id == id)
        cart[index] = aux
        cart.save()
        return true
    }

    async updateProductsCart(id, products) {
        super.setConnection()
        const cart = await this.model.findById(id)
        cart.products = products
        cart.save()
        return true
    }

}
export default ManagerCartMongoDB