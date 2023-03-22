import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/managerMongoDB.js";
import { ManagerProductMongoDB } from "./Product.js";

const url = process.env.URLMONGODB
const cart = await this.model.findById(id)
const cartSchema = new Schema ({
    products:[{
        id_prod: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }]
})


export class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {

        super(url, "cart", cartSchema)
        
    }
    
    async addProductCart(id) {
        
        super.setConnection()
        try {
            cart.products.push({ id_prod: idProd, quantity: quant})
            return cart.save()
        }catch(error){
            return error
        }
    }
    async getProductsCart(){
        super.setConnection()
        try {

            const prods = await this.model.find().populate("products.id_prod")
            return prods
            
        } catch (error) {
            return error
        }
    }

    async deleteProductCart(id){
        super.setConnection()
        try{
            cart.products.filter(prod => prod._id != id)
            cart.save()
            return true
        }catch(error){

        }
    }
}
export default ManagerCartMongoDB