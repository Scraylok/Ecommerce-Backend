import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/managerMongoDB.js";

const url = process.env.URLMONGODB

const messageSchema = new Schema ({
    nombre: String,
    email: {
        type: String,
        unique: true
    },
    message: String
})


class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor() {

        super(url, "message", messageSchema)
        
    }
}
export default ManagerMessageMongoDB