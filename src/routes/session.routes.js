import { Router } from "express";
import { destroySession, testLogin } from "../controllers/sessionManager.js";

const routerSession = Router()

routerSession.post("/testLogin", testLogin)
routerSession.get("/logout", destroySession)

export default routerSession