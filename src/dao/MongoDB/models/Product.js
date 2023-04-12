import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/managerMongoDB.js";
import paginate from 'mongoose-paginate-v2'

const url = process.env.URLMONGODB

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required: true,
        index: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    stock:{
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    thumbnail: {
        type: Array,
        default: []
    }
    
})

productSchema.plugin(paginate)

class ManagerProductMongoDB extends ManagerMongoDB {
    
    constructor() {
        super(url, "products", productSchema)
        }
    async getProducts(limit, page, filter, ord) {
        super.setConnection()
        try {
            const products = await this.model.paginate({ filter: filter }, { limit: limit, page: page, sort: { price: ord } })
            return products;
          } catch (error) {
            return error;
          }
    }

}
export default ManagerProductMongoDB
console.log(ManagerProductMongoDB)
