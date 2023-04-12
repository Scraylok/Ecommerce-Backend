import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/managerMongoDB.js";


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

        super(process.env.URLMONGODB, "message", messageSchema)
        
    }
}
export default ManagerMessageMongoDB