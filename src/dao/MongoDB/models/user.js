import { ManagerMongoDB } from "../../../db/managerMongoDB.js";
import {Schema, model} from "mongoose";


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


class ManagerUserMongoDB extends ManagerMongoDB {
  constructor() {
      super(process.env.URLMONGODB, "users", userSchema)
  }
}
export default ManagerUserMongoDB