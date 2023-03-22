import { Schema,model } from "mongoose";
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
        required: true
    },
    category: {
        type: String,
        required: true
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

export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {

        super(url, "products", productSchema)
        
    }
    async getProducts(limit, page, filter, ord) {
        super.setconnection()
        const products = await this.model.paginate()
    }

}
