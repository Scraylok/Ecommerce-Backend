import { Router } from "express";
import { createUser } from "../controllers/userManager.js";

const routerUser = Router()

routerUser.post("/", createUser)

export default routerUser